import { useEffect, useState } from "react";
import Head from "next/head";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import Image from "next/image";
import GoogleIcon from "@mui/icons-material/Google";
import Alert from "../../components/Alert";
import Alert2 from "../../components/Alert2";
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
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import {
  subscriptionRequestCreateApiCall,
  subscriptionPlanListAPIGet,
  redirectToken,
  getAuthToken,
} from "../../common/apiCall/api";
import { BACK, LOGIN, SUBMIT, SUBSCRIBE } from "../../common/constantData/language";
import { LOGIN_SCREEN_URL } from "../../common/constantData/screenUrl";
import { setHeaders } from "../../common/apiCall/axiosSetup";
import { APP_URL } from "../../common/constantData/constants";

const Page = () => {
  const router = useRouter();
  const [subscriptionData, setSubscriptionData] = useState([]);
  const planId = getQueryParam("plan");
  const [isTermsChecked, setIsTermsChecked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await subscriptionPlanListAPIGet();
        const SubscriptionList = response?.data?.subscription_plans;
        console.log("SubscriptionList", SubscriptionList);
        setSubscriptionData(SubscriptionList);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }
  const getToken = (token) => {
    let to_url = APP_URL + "/dashboard";
    getAuthToken({ token: token })
      .then((response) => {
        if (response?.code == 200) {
          if (response?.data?.user?.token) {
            localStorage.setItem("token", response?.data?.user?.token);
            window.location.href = to_url;
          }
          setHeaders(response?.data?.user?.token);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Example: Get the value of the 'param' query parameter
  const paramValue = getQueryParam("token");
  if (getQueryParam("token")) {
    getToken(getQueryParam("token"));
  }
  console.log('Value of "param" query parameter:', paramValue);

  const [openAlert1, setOpenAlert1] = useState(false);
  const [openAlert2, setOpenAlert2] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState();
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [options, setOptions] = useState([]);

  const options2 = [
    { name: "Afghanistan", code: "AF" },
    { name: "Åland Islands", code: "AX" },
    { name: "Albania", code: "AL" },
    { name: "Algeria", code: "DZ" },
    { name: "American Samoa", code: "AS" },
    { name: "AndorrA", code: "AD" },
    { name: "Angola", code: "AO" },
    { name: "Anguilla", code: "AI" },
    { name: "Antarctica", code: "AQ" },
    { name: "Antigua and Barbuda", code: "AG" },
    { name: "Argentina", code: "AR" },
    { name: "Armenia", code: "AM" },
    { name: "Aruba", code: "AW" },
    { name: "Australia", code: "AU" },
    { name: "Austria", code: "AT" },
    { name: "Azerbaijan", code: "AZ" },
    { name: "Bahamas", code: "BS" },
    { name: "Bahrain", code: "BH" },
    { name: "Bangladesh", code: "BD" },
    { name: "Barbados", code: "BB" },
    { name: "Belarus", code: "BY" },
    { name: "Belgium", code: "BE" },
    { name: "Belize", code: "BZ" },
    { name: "Benin", code: "BJ" },
    { name: "Bermuda", code: "BM" },
    { name: "Bhutan", code: "BT" },
    { name: "Bolivia", code: "BO" },
    { name: "Bosnia and Herzegovina", code: "BA" },
    { name: "Botswana", code: "BW" },
    { name: "Bouvet Island", code: "BV" },
    { name: "Brazil", code: "BR" },
    { name: "British Indian Ocean Territory", code: "IO" },
    { name: "Brunei Darussalam", code: "BN" },
    { name: "Bulgaria", code: "BG" },
    { name: "Burkina Faso", code: "BF" },
    { name: "Burundi", code: "BI" },
    { name: "Cambodia", code: "KH" },
    { name: "Cameroon", code: "CM" },
    { name: "Canada", code: "CA" },
    { name: "Cape Verde", code: "CV" },
    { name: "Cayman Islands", code: "KY" },
    { name: "Central African Republic", code: "CF" },
    { name: "Chad", code: "TD" },
    { name: "Chile", code: "CL" },
    { name: "China", code: "CN" },
    { name: "Christmas Island", code: "CX" },
    { name: "Cocos (Keeling) Islands", code: "CC" },
    { name: "Colombia", code: "CO" },
    { name: "Comoros", code: "KM" },
    { name: "Congo", code: "CG" },
    { name: "Congo, The Democratic Republic of the", code: "CD" },
    { name: "Cook Islands", code: "CK" },
    { name: "Costa Rica", code: "CR" },
    { name: "Cote D'Ivoire", code: "CI" },
    { name: "Croatia", code: "HR" },
    { name: "Cuba", code: "CU" },
    { name: "Cyprus", code: "CY" },
    { name: "Czech Republic", code: "CZ" },
    { name: "Denmark", code: "DK" },
    { name: "Djibouti", code: "DJ" },
    { name: "Dominica", code: "DM" },
    { name: "Dominican Republic", code: "DO" },
    { name: "Ecuador", code: "EC" },
    { name: "Egypt", code: "EG" },
    { name: "El Salvador", code: "SV" },
    { name: "Equatorial Guinea", code: "GQ" },
    { name: "Eritrea", code: "ER" },
    { name: "Estonia", code: "EE" },
    { name: "Ethiopia", code: "ET" },
    { name: "Falkland Islands (Malvinas)", code: "FK" },
    { name: "Faroe Islands", code: "FO" },
    { name: "Fiji", code: "FJ" },
    { name: "Finland", code: "FI" },
    { name: "France", code: "FR" },
    { name: "French Guiana", code: "GF" },
    { name: "French Polynesia", code: "PF" },
    { name: "French Southern Territories", code: "TF" },
    { name: "Gabon", code: "GA" },
    { name: "Gambia", code: "GM" },
    { name: "Georgia", code: "GE" },
    { name: "Germany", code: "DE" },
    { name: "Ghana", code: "GH" },
    { name: "Gibraltar", code: "GI" },
    { name: "Greece", code: "GR" },
    { name: "Greenland", code: "GL" },
    { name: "Grenada", code: "GD" },
    { name: "Guadeloupe", code: "GP" },
    { name: "Guam", code: "GU" },
    { name: "Guatemala", code: "GT" },
    { name: "Guernsey", code: "GG" },
    { name: "Guinea", code: "GN" },
    { name: "Guinea-Bissau", code: "GW" },
    { name: "Guyana", code: "GY" },
    { name: "Haiti", code: "HT" },
    { name: "Heard Island and Mcdonald Islands", code: "HM" },
    { name: "Holy See (Vatican City State)", code: "VA" },
    { name: "Honduras", code: "HN" },
    { name: "Hong Kong", code: "HK" },
    { name: "Hungary", code: "HU" },
    { name: "Iceland", code: "IS" },
    { name: "India", code: "IN" },
    { name: "Indonesia", code: "ID" },
    { name: "Iran, Islamic Republic Of", code: "IR" },
    { name: "Iraq", code: "IQ" },
    { name: "Ireland", code: "IE" },
    { name: "Isle of Man", code: "IM" },
    { name: "Israel", code: "IL" },
    { name: "Italy", code: "IT" },
    { name: "Jamaica", code: "JM" },
    { name: "Japan", code: "JP" },
    { name: "Jersey", code: "JE" },
    { name: "Jordan", code: "JO" },
    { name: "Kazakhstan", code: "KZ" },
    { name: "Kenya", code: "KE" },
    { name: "Kiribati", code: "KI" },
    { name: "Korea, Democratic People'S Republic of", code: "KP" },
    { name: "Korea, Republic of", code: "KR" },
    { name: "Kuwait", code: "KW" },
    { name: "Kyrgyzstan", code: "KG" },
    { name: "Lao People'S Democratic Republic", code: "LA" },
    { name: "Latvia", code: "LV" },
    { name: "Lebanon", code: "LB" },
    { name: "Lesotho", code: "LS" },
    { name: "Liberia", code: "LR" },
    { name: "Libyan Arab Jamahiriya", code: "LY" },
    { name: "Liechtenstein", code: "LI" },
    { name: "Lithuania", code: "LT" },
    { name: "Luxembourg", code: "LU" },
    { name: "Macao", code: "MO" },
    { name: "Macedonia, The Former Yugoslav Republic of", code: "MK" },
    { name: "Madagascar", code: "MG" },
    { name: "Malawi", code: "MW" },
    { name: "Malaysia", code: "MY" },
    { name: "Maldives", code: "MV" },
    { name: "Mali", code: "ML" },
    { name: "Malta", code: "MT" },
    { name: "Marshall Islands", code: "MH" },
    { name: "Martinique", code: "MQ" },
    { name: "Mauritania", code: "MR" },
    { name: "Mauritius", code: "MU" },
    { name: "Mayotte", code: "YT" },
    { name: "Mexico", code: "MX" },
    { name: "Micronesia, Federated States of", code: "FM" },
    { name: "Moldova, Republic of", code: "MD" },
    { name: "Monaco", code: "MC" },
    { name: "Mongolia", code: "MN" },
    { name: "Montserrat", code: "MS" },
    { name: "Morocco", code: "MA" },
    { name: "Mozambique", code: "MZ" },
    { name: "Myanmar", code: "MM" },
    { name: "Namibia", code: "NA" },
    { name: "Nauru", code: "NR" },
    { name: "Nepal", code: "NP" },
    { name: "Netherlands", code: "NL" },
    { name: "Netherlands Antilles", code: "AN" },
    { name: "New Caledonia", code: "NC" },
    { name: "New Zealand", code: "NZ" },
    { name: "Nicaragua", code: "NI" },
    { name: "Niger", code: "NE" },
    { name: "Nigeria", code: "NG" },
    { name: "Niue", code: "NU" },
    { name: "Norfolk Island", code: "NF" },
    { name: "Northern Mariana Islands", code: "MP" },
    { name: "Norway", code: "NO" },
    { name: "Oman", code: "OM" },
    { name: "Pakistan", code: "PK" },
    { name: "Palau", code: "PW" },
    { name: "Palestinian Territory, Occupied", code: "PS" },
    { name: "Panama", code: "PA" },
    { name: "Papua New Guinea", code: "PG" },
    { name: "Paraguay", code: "PY" },
    { name: "Peru", code: "PE" },
    { name: "Philippines", code: "PH" },
    { name: "Pitcairn", code: "PN" },
    { name: "Poland", code: "PL" },
    { name: "Portugal", code: "PT" },
    { name: "Puerto Rico", code: "PR" },
    { name: "Qatar", code: "QA" },
    { name: "Reunion", code: "RE" },
    { name: "Romania", code: "RO" },
    { name: "Russian Federation", code: "RU" },
    { name: "RWANDA", code: "RW" },
    { name: "Saint Helena", code: "SH" },
    { name: "Saint Kitts and Nevis", code: "KN" },
    { name: "Saint Lucia", code: "LC" },
    { name: "Saint Pierre and Miquelon", code: "PM" },
    { name: "Saint Vincent and the Grenadines", code: "VC" },
    { name: "Samoa", code: "WS" },
    { name: "San Marino", code: "SM" },
    { name: "Sao Tome and Principe", code: "ST" },
    { name: "Saudi Arabia", code: "SA" },
    { name: "Senegal", code: "SN" },
    { name: "Serbia and Montenegro", code: "CS" },
    { name: "Seychelles", code: "SC" },
    { name: "Sierra Leone", code: "SL" },
    { name: "Singapore", code: "SG" },
    { name: "Slovakia", code: "SK" },
    { name: "Slovenia", code: "SI" },
    { name: "Solomon Islands", code: "SB" },
    { name: "Somalia", code: "SO" },
    { name: "South Africa", code: "ZA" },
    { name: "South Georgia and the South Sandwich Islands", code: "GS" },
    { name: "Spain", code: "ES" },
    { name: "Sri Lanka", code: "LK" },
    { name: "Sudan", code: "SD" },
    { name: "Suriname", code: "SR" },
    { name: "Svalbard and Jan Mayen", code: "SJ" },
    { name: "Swaziland", code: "SZ" },
    { name: "Sweden", code: "SE" },
    { name: "Switzerland", code: "CH" },
    { name: "Syrian Arab Republic", code: "SY" },
    { name: "Taiwan, Province of China", code: "TW" },
    { name: "Tajikistan", code: "TJ" },
    { name: "Tanzania, United Republic of", code: "TZ" },
    { name: "Thailand", code: "TH" },
    { name: "Timor-Leste", code: "TL" },
    { name: "Togo", code: "TG" },
    { name: "Tokelau", code: "TK" },
    { name: "Tonga", code: "TO" },
    { name: "Trinidad and Tobago", code: "TT" },
    { name: "Tunisia", code: "TN" },
    { name: "Turkey", code: "TR" },
    { name: "Turkmenistan", code: "TM" },
    { name: "Turks and Caicos Islands", code: "TC" },
    { name: "Tuvalu", code: "TV" },
    { name: "Uganda", code: "UG" },
    { name: "Ukraine", code: "UA" },
    { name: "United Arab Emirates", code: "AE" },
    { name: "United Kingdom", code: "GB" },
    { name: "United States", code: "US" },
    { name: "United States Minor Outlying Islands", code: "UM" },
    { name: "Uruguay", code: "UY" },
    { name: "Uzbekistan", code: "UZ" },
    { name: "Vanuatu", code: "VU" },
    { name: "Venezuela", code: "VE" },
    { name: "Viet Nam", code: "VN" },
    { name: "Virgin Islands, British", code: "VG" },
    { name: "Virgin Islands, U.S.", code: "VI" },
    { name: "Wallis and Futuna", code: "WF" },
    { name: "Western Sahara", code: "EH" },
    { name: "Yemen", code: "YE" },
    { name: "Zambia", code: "ZM" },
    { name: "Zimbabwe", code: "ZW" },
  ];
  useEffect(() => {
    setOptions(subscriptionData);
    // if (subscriptionData) {
    //   if (planId) {
    //     const findSubscriptionPlan = subscriptionData.find(
    //       (item) => Number(item.id) === Number(planId)
    //     );
    //     console.log(findSubscriptionPlan, planId);
    //     setSelectedOption(findSubscriptionPlan);
    //   } else {
    //     setSelectedOption(null);
    //   }
    // }
  }, [subscriptionData]);

  const handleAlertClose = () => {
    setResponseMessage("");
    setOpenAlert1(false);
    setOpenAlert2(false);
  };

  const initialValues = {
    name: "",
    email: "",
    subscription_plan_id: null,
    mobile: "",
    country: "",
    message: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(SUBSCRIBE.ERROR_NAME),
    email: Yup.string()
      .email("Invalid email format")
      .required(SUBSCRIBE.ERROR_EMAIL)
      .matches(/^[^@]+@[^@]+\.[^@]+$/, "Invalid email format"),
    mobile: Yup.string()
      .matches(/^01[0-9]{9}$/, "Invalid phone number")
      .required(SUBSCRIBE.ERROR_PHONE),
    message: Yup.string().required(SUBSCRIBE.ERROR_MESSSAGE),
    subscription_plan_id: Yup.string().required(SUBSCRIBE.ERROR_SUBSCRIPTION_PLAN),
  });

  const handleSubmit = (data) => {
    subscriptionRequestCreateApiCall(data)
      .then((res) => {
        if (res.code === 200) {
          setResponseMessage(SUBSCRIBE.ADD_SUCCESS_MESSAGE);
          setOpenAlert1(true);
          setTimeout(() => {
            router.push(LOGIN_SCREEN_URL);
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
        setResponseMessage(SUBSCRIBE.ADD_ERROR_MESSAGE);
        setOpenAlert2(true);
      });
  };

  const label = { inputProps: { "aria-label": "I agree with the terms & conditions" } };
  return (
    <>
      <Head>
        <title>{SUBSCRIBE.TITLE}</title>
      </Head>

      <>
        <div className="loginPaseLogo" style={{ textAlign: "center", marginBottom: "1rem" }}>
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
            <Grid container columns={12} spacing={1} sx={{ width: "75%" }} className="temImage">
              <Grid item xs={12} md={5} sm={12}>
                <CardContent>
                  <h2
                    style={{
                      marginBottom: "1rem",
                      fontSize: "1.2rem",
                      fontWeight: "500",
                    }}
                  >
                    Refund & Return Policy
                  </h2>
                  <ul
                    style={{
                      color: "#3E3F42",
                      fontSize: ".9rem",
                      lineHeight: "1.5rem",
                      fontWeight: "400",
                    }}
                  >
                    <li>
                      Return or refund request must be raised within 7 to 10 days for any product
                      and services, or from the date of delivery of services.
                    </li>
                    <li>
                      If you are not satisfied on your purchase subscription package, please raise a
                      return request on SmartHealth website.
                    </li>
                    <li>
                      For selected products, we accept refund on the change of your mind. Please
                      refer to your subscription id and send to email at info{" "}
                      <a
                        style={{ color: "#0F9D58", textDecoration: "none" }}
                        href=""
                      >
                        smarthealth.org
                      </a>
                    </li>
                  </ul>
                  <h2
                    style={{
                      marginBottom: "1rem",
                      fontSize: "1.2rem",
                      fontWeight: "500",
                    }}
                  >
                    Issuance of Refunds
                  </h2>
                  <ul
                    style={{
                      color: "#3E3F42",
                      fontSize: ".9rem",
                      lineHeight: "1.5rem",
                      fontWeight: "400",
                    }}
                  >
                    <li>
                      The refund period / process starts when marchohealthplus has processed your
                      refund according to your refund type.
                    </li>
                    <li>
                      The processing time of your refund depends on the type of refund and the
                      payment method you used.
                    </li>
                    <li>The refund amount covers the item price show the purchase.</li>
                  </ul>
                  {/* <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={1}>
                      <GoogleIcon sx={{color:"#0F9D58"}}/>
                    </Grid>
                    <Grid item xs={11}>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{ margin: "-13px 0 8px 0", fontWeight: 600 }}
                      >
                        Save 48% on maintenance costs with Macro
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        -- SmartWatt Case Study
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    sx={{ marginTop: "2rem" }}
                  >
                    <Grid item xs={1}>
                      <GoogleIcon sx={{color:"#0F9D58"}}/>
                    </Grid>
                    <Grid item xs={11}>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{ margin: "-13px 0 8px 0", fontWeight: 600 }}
                      >
                        Reduce time spent on inspections by 83%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        -- SmartWatt Case Study
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    sx={{ marginTop: "2rem" }}
                  >
                    <Grid item xs={1}>
                      <GoogleIcon sx={{color:"#0F9D58"}}/>
                    </Grid>
                    <Grid item xs={11}>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{ margin: "-13px 0 8px 0", fontWeight: 600 }}
                      >
                        Run Macro Health reports 10x faster than before
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        -- SmartWatt Case Study
                      </Typography>
                    </Grid>
                  </Grid>
                  <div>
                    <Divider />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{ margin: "-13px 0 8px 0", fontWeight: 600 }}
                      >
                        Detect and Address Maintenance Trends quickly with these Widgets
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                      </Typography>
                    </CardContent>

                    <Divider />
                  </div> */}
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
                      User Registration for SmartHealth
                    </Typography>
                    {/* <Typography
                      sx={{ fontSize: 16, textAlign: "center", padding: "5px" }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Already have an account?
                      <a
                        href="/"
                        style={{
                          textDecoration: "none",
                          color: "#3498db",
                          display: "inline-block",
                          marginLeft: "5px",
                        }}
                      >
                        Log in
                      </a>
                    </Typography> */}

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
                            <Grid item xs={6}>
                              <div>
                                <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                  {SUBSCRIBE.MAME} <span style={{ color: "red" }}>*</span>
                                </label>

                                <Field
                                  size="small"
                                  variant="outlined"
                                  sx={{ mb: 3 }}
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
                                  {SUBSCRIBE.EMAIL} <span style={{ color: "red" }}>*</span>
                                </label>

                                <Field
                                  size="small"
                                  variant="outlined"
                                  sx={{ mb: 3 }}
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
                            <Grid item xs={12}>
                              <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                {SUBSCRIBE.SUBSCRIPTION_PLAN}{" "}
                                <span style={{ color: "red" }}>*</span>
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
                                    // defaultValue={options?.find(
                                    //   (item) => item.id === Number(planId)
                                    // )}
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
                            </Grid>
                            <Grid item xs={6}>
                              <div>
                                <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                  {SUBSCRIBE.PHONE} <span style={{ color: "red" }}>*</span>
                                </label>

                                <Field
                                  size="small"
                                  variant="outlined"
                                  sx={{ mb: 3 }}
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
                              <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                {SUBSCRIBE.COUNTRY} <span style={{ color: "red" }}>*</span>
                              </label>
                              <Field name="country" as={Autocomplete}>
                                {({ field, form }) => (
                                  <Autocomplete
                                    {...field}
                                    value={selectedOption2}
                                    onChange={(event, newValue) => {
                                      setSelectedOption2(newValue);
                                      form.setFieldValue(
                                        "country",
                                        newValue ? newValue.name : null
                                      );
                                    }}
                                    options={options2}
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        size="small"
                                        variant="outlined"
                                        error={form.errors.country && form.touched.country}
                                        helperText={
                                          form.errors.country &&
                                          form.touched.country &&
                                          form.errors.country
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
                                <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                  {SUBSCRIBE.MESSAGE} <span style={{ color: "red" }}>*</span>
                                </label>

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
                                {touched.message && errors.message && (
                                  <div
                                    style={{
                                      color: "red",
                                      fontSize: "12px",
                                      marginTop: "-20px",
                                      marginLeft: "15px",
                                    }}
                                  >
                                    {errors.message}
                                  </div>
                                )}
                              </div>
                            </Grid>
                            <Grid item xs={12}>
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

                            <Grid item xs={12}>
                              <div>
                                <Button
                                  type="submit"
                                  variant="contained"
                                  disabled={!isTermsChecked}
                                  fullWidth
                                  sx={{
                                    background: isTermsChecked ? "#0fb860" : "gray",
                                    color: "white",
                                    cursor: isTermsChecked ? "pointer" : "not-allowed",
                                    borderRadius: "4px",
                                    marginTop: "2rem",
                                    fontWeight: "bold",
                                    fontSize: "18px",
                                  }}
                                >
                                  {SUBMIT}
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

export default Page;