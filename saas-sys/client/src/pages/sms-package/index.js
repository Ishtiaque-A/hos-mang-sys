import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import {
  setUserProfileToReducer,
  userOrganizationSetToReducer,
} from "src/stateManagement/auth/AuthActionCreators";
import getAuthState from "src/stateManagement/auth/AuthSelector";
import { setIsAuthenticated } from "src/stateManagement/global/GlobalActionCreators";
import getGlobalState from "src/stateManagement/global/globalSelector";
import { connect } from "react-redux";
import Head from "next/head";
import { FaMinus, FaPlus } from "react-icons/fa6";
import {
  Container,
  Stack,
  Typography,
  Box,
  Button,
  TextField,
  Grid,
  Select,
  MenuItem,
  TextareaAutosize,
  Switch,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import { Formik, Form, Field, FormikProps } from "formik";
import { RxCrossCircled } from "react-icons/rx";
import { FiCheckCircle } from "react-icons/fi";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import {
  StoreSMSGatewayCreateApiCall,
  UpdateSMSGateway,
  fetchPackageTransaction,
  fetchSMSGatewayListAPIGet,
} from "src/common/apiCall/api";
import { format, parseISO } from "date-fns";
// import { DesktopDatePicker } from "@mui/lab";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import { DatePicker } from "@mui/x-date-pickers";
import DatePicker from "react-datepicker";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import InputBase from "@mui/material/InputBase";
// import "style.css";

import "react-datepicker/dist/react-datepicker.css";
import { neutral, success } from "src/theme/colors";

import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(neutral["700"], 0.15),

  "&:hover": {
    backgroundColor: alpha(neutral["400"], 0.25),
    border: `1px solid ${success.primary}`,
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
        border: `2px solid ${success.primary}`,
        borderRadius: "5px",
      },
    },
  },
}));

const DatePickerField = ({ field, form, ...other }) => {
  const { name, value } = field;
  const { setFieldValue, setFieldTouched } = form;

  const handleChange = (date) => {
    setFieldValue(name, date);
  };

  const handleBlur = () => {
    setFieldTouched(name, true);
  };

  return (
    <div>
      <DatePicker
        {...other}
        selected={value}
        onChange={handleChange}
        placeholderText="DD/MM/YYYY"
        onBlur={handleBlur}
        dateFormat="dd/MM/yyyy"
        minDate={new Date()}
        calendarContainer={document.getElementById("calendar-container")}
        customInput={
          <TextField
            fullWidth
            variant="outlined"
            disabled // Disable input field
            InputProps={{
              sx: {
                "& input": {
                  width: "430px", // Full width
                  padding: "10px",
                  border: "none", // Remove border
                },
              },
            }}
          />
        }
        customInputRef={(ref) => {
          if (ref && ref.input) {
            ref.input.readOnly = true; // Make input read-only
          }
        }}
        renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
          <div>
            <Button
              onClick={decreaseMonth}
              variant="text"
              sx={{ border: "none" }} // Remove border from button
            >
              Previous
            </Button>
            <span>{date.toLocaleDateString()}</span>
            <Button
              onClick={increaseMonth}
              variant="text"
              sx={{ border: "none" }} // Remove border from button
            >
              Next
            </Button>
          </div>
        )}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: getGlobalState(state)?.isAuthenticated,
  testData: getGlobalState(state)?.testData,
  userOrganization: getAuthState(state)?.userOrganization,
});

const mapDispatchToProps = (dispatch) => ({
  setUserProfileToReducerProp: (data) => dispatch(setUserProfileToReducer(data)),
  setIsAuthenticatedProp: (data) => dispatch(setIsAuthenticated(data)),
  userOrganizationSetToReducerProp: (data) => dispatch(userOrganizationSetToReducer(data)),
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const initialValues = {
  title: null,
  description: null,
  price: null,
  currency: null,
  expire_date: null,
  buy_sms_count: null,
  status: null,
  services: [
    {
      name: null,
      status: 1,
    },
  ],
};

const durationOption = [
  {
    id: 1,
    label: "1 Month",
    value: 1,
  },
  {
    id: 2,
    label: "2 Month",
    value: 2,
  },
  {
    id: 3,
    label: "3 Months",
    value: 3,
  },
  {
    id: 4,
    label: "4 Months",
    value: 4,
  },
  {
    id: 5,
    label: "5 Months",
    value: 5,
  },
  {
    id: 5,
    label: "5 Months",
    value: 5,
  },
  {
    id: 6,
    label: "6 Months",
    value: 6,
  },
  {
    id: 7,
    label: "7 Months",
    value: 7,
  },
  {
    id: 8,
    label: "8 Months",
    value: 8,
  },
  {
    id: 9,
    label: "9 Months",
    value: 9,
  },
  {
    id: 10,
    label: "10 Months",
    value: 10,
  },
  {
    id: 11,
    label: "11 Months",
    value: 11,
  },
  {
    id: 12,
    label: "1 Year",
    value: 12,
  },
];

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().nullable(),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required")
    .min(10, "Maximum Price is 10")
    .max(10000, "Maximum Price is 10000"),
  expire_date: Yup.date()
    .min(new Date(), "Package expiry date must be today or a future date")
    .typeError("Expiry Date must be a date")
    .required("Expiry Date is required"),
  duration: Yup.number().typeError("Duration must be a number").required("Duration is required"),
  buy_sms_count: Yup.number()
    .typeError("SMS Count must be a number")
    .required("SMS Count is required")
    .min(100, "Minimum SMS Count is 100")
    .max(100000, "Maximum SMS Count is 100000"),
  status: Yup.number().typeError("Must be select status").required("Status is required"),
  services: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Service name is required"),
        status: Yup.number().typeError("Must be select status"),
      })
    )
    .min(1, "At least one service is required"),
});

const Page = (props) => {
  //   const { userOrganization } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDetails, setIsOpenDetails] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [serviceList, setServiceList] = useState([]);
  const [checking, setChecking] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [tableValue, setTabValue] = useState("1");
  const [searchValue, setSearchValue] = useState("");
  const [packageTransaction, setPackageTransaction] = useState([]);
  console.log(searchValue, "searchValue");
  const onRefetch = () => setRefresh((prev) => !prev);

  useEffect(() => {
    fetchSMSGatewayListAPIGet()
      .then((res) => {
        setServiceList(res?.data);
      })
      .catch((err) => console.log(err));
    fetchPackageTransaction()
      .then((res) => setPackageTransaction(res))
      .catch((err) => console.log(err));
  }, [refresh]);

  useEffect(() => {
    if (searchValue) {
      setPackageTransaction((prev) => {
        return prev.filter((item) => {
          return item.transaction_id.toLowerCase().includes(searchValue.toLowerCase());
        });
      });
    } else {
      onRefetch();
    }
  }, [searchValue]);

  const onClose = () => {
    setIsOpen(false);
  };

  const onCloseDetails = () => {
    setIsOpenDetails(false);
    setSelectedRow(null);
  };

  const handleSubmit = (data) => {
    const updateData = { ...data, currency: "BDT" };
    setBtnLoading(true);

    StoreSMSGatewayCreateApiCall(updateData)
      .then((res) => {
        console.log(res, "sms create api response");
        if (res.code === 200) {
          onRefetch();
          onClose();
          setBtnLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setBtnLoading(false);
      });
  };

  const handleChangeStatus = (event, id) => {
    const isChecked = event.target.checked ? 1 : 0;

    setChecking(true);

    setServiceList((prevServList) => {
      return prevServList.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status: isChecked,
          };
        } else {
          return item;
        }
      });
    });
    UpdateSMSGateway({ status: isChecked }, id)
      .then((res) => {
        if (res.code === 200) {
          setChecking(false);
        }
      })
      .catch((err) => {
        setChecking(false);
        console.log(err);
      });
  };

  const handleShowDetails = (data) => {
    setSelectedRow(data);
    setIsOpenDetails(true);
  };

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Box sx={{ backgroundColor: "white", mx: "10px", my: "20px", borderRadius: "30px" }}>
        <Head>
          <title>
            <title>SMS Package</title>
          </title>
        </Head>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
            //change
            marginTop: "1%",
            // bgcolor: "#F6F7F7",
            overflowX: "hidden",
          }}
        >
          <TabContext value={tableValue}>
            <Container
              sx={{
                marginX: "5px",
              }}
              maxWidth="xl"
            >
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  sx={{
                    "& .Mui-selected": {
                      color: `${success.primary} !important`,
                      borderBottom: `2px solid  ${success.primary}`,
                    },
                  }}
                  onChange={handleChange}
                  indicatorColor="success"
                  aria-label="lab API tabs example"
                >
                  <Tab label="SMS Package" value="1" />
                  <Tab label="Package Transaction" value="2" />
                </TabList>
              </Box>
            </Container>
            <TabPanel value="1">
              <Container maxWidth="xl" disableGutters>
                <Stack
                  spacing={3}
                  sx={{
                    backgroundColor: "#fff",
                    // padding: "7px 16px",
                    borderRadius: "10px",
                    // border:"1px solid #eee"
                    // boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 6px",
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={4}
                  >
                    <Stack spacing={1}>
                      <Typography
                        variant="h5"
                        // sx={{
                        //   marginLeft: "10px",
                        //   fontSize: "18px",
                        //   fontWeight: "500",
                        //   marginBottom: "0px",
                        // }}
                      >
                        SMS Packages
                      </Typography>
                    </Stack>
                    <Button
                      onClick={() => setIsOpen(true)}
                      variant="contained"
                      sx={{
                        backgroundColor: success.primary,
                        "&:hover": {
                          backgroundColor: success.primary, // Change hover color
                        },
                        "&:active": {
                          backgroundColor: success.primary, // Change active color
                        },
                      }}
                    >
                      Add package
                    </Button>
                  </Stack>
                </Stack>

                <TableContainer
                  component={Paper}
                  sx={{
                    marginTop: "20px",
                    border:"1px solid #eee"
                    // boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  }}
                >
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">SL&nbsp;</TableCell>
                        <TableCell align="center">Package Title &nbsp;</TableCell>
                        <TableCell align="center">Expiry Date&nbsp;</TableCell>
                        <TableCell align="center">Duration&nbsp;</TableCell>
                        <TableCell align="center">Price&nbsp;</TableCell>
                        <TableCell align="center">SMS Count&nbsp;</TableCell>
                        <TableCell align="center">Status&nbsp;</TableCell>
                        <TableCell align="center">Action&nbsp;</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {!serviceList ||
                        (serviceList.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={7} align="center">
                              {" "}
                              No Package Found
                            </TableCell>
                          </TableRow>
                        ))}
                      {serviceList.length > 0 &&
                        serviceList.map((row, index) => (
                          <TableRow
                            key={row?.id}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              {index + 1}
                            </TableCell>
                            <TableCell align="center">{row.title}</TableCell>
                            <TableCell align="center">
                              {format(new Date(row.expire_date), "dd/MM/yyyy")}
                            </TableCell>
                            <TableCell align="center">
                              {row.duration === 12 ? `${row?.duration} Year` : null}
                              {row.duration !== 12 && row?.duration < 2
                                ? `${row?.duration} Month`
                                : `${row?.duration} Months`}
                            </TableCell>
                            <TableCell align="center">
                              {row.price} {row.currency}
                            </TableCell>
                            <TableCell align="center">{row.buy_sms_count}</TableCell>
                            <TableCell align="center">
                              <Switch
                                disabled={checking}
                                onChange={(e) => handleChangeStatus(e, row.id)}
                                title={row.status === 1 ? "Active" : "Inactive"}
                                checked={row.status === 1 ? true : false}
                                sx={{
                                  "& .MuiSwitch-thumb": {
                                    backgroundColor: `${
                                      row.status === 1 ? success.primary : neutral["500"]
                                    } !important`,
                                  },
                                  "& .Mui-checked + .MuiSwitch-track": {
                                    backgroundColor:
                                      row.status === 1 ? success.primary : neutral["50"],
                                  },
                                }}
                                size="large"
                              />
                            </TableCell>
                            <TableCell align="center">
                              <IconButton
                                onClick={() => handleShowDetails(row)}
                                variant="contained"
                              >
                                <MdOutlineRemoveRedEye />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                {/* Modal dialog */}
                <BootstrapDialog
                  onClose={onClose}
                  aria-labelledby="customized-dialog-title"
                  open={isOpen}
                >
                  <DialogTitle
                    sx={{
                      marginLeft: "10px",
                      fontSize: "18px",
                      fontWeight: "500",
                      marginBottom: "0px",
                      m: 0,
                      p: 2,
                    }}
                    id="customized-dialog-title"
                  >
                    Add SMS package
                  </DialogTitle>
                  <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                      position: "absolute",
                      right: 8,
                      top: 8,
                      color: (theme) => theme.palette.grey[500],
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                  <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                  >
                    {({ values, errors, touched, setFieldValue, handleSubmit }) => (
                      <Form onSubmit={handleSubmit} encType="multipart/form-data" method="post">
                        <DialogContent
                          sx={{
                            width: "500px",
                            overflowY: "auto",
                            maxHeight: "70vh",
                          }}
                          dividers
                        >
                          <Grid item xs={12}>
                            <div>
                              <LabelComponent title={"Package Title"} id="title" isRequired />
                              <Field
                                size="small"
                                variant="outlined"
                                id="title"
                                sx={{
                                  mb: 2,
                                  "& input": {
                                    color: "#4F4D4D",
                                  },
                                }}
                                name="title"
                                as={TextField}
                                type="text"
                                fullWidth
                              />
                              {touched.title && errors.title && (
                                <ShowErrorMessage msg={errors.title} />
                              )}
                            </div>
                          </Grid>
                          <Grid item xs={12}>
                            <div>
                              <LabelComponent
                                title={"Package Expiry Date "}
                                id="expire_date"
                                isRequired
                              />
                              <Field
                                component={DatePickerField}
                                name="expire_date"
                                values={values}
                                touched={touched}
                                errors={errors}
                                setFieldValue={setFieldValue}
                              />
                              {touched.expire_date && errors.expire_date && (
                                <ShowErrorMessage msg={errors.expire_date} />
                              )}
                            </div>
                          </Grid>
                          <Grid item xs={12}>
                            <div>
                              <LabelComponent
                                title={"Package Duration "}
                                id="duration"
                                isRequired
                              />
                              <Field
                                size="small"
                                variant="outlined"
                                id="duration"
                                sx={{
                                  mb: 2,
                                  "& input": {
                                    color: "#4F4D4D",
                                  },
                                }}
                                name="duration"
                                as={Select}
                                fullWidth
                              >
                                {durationOption?.map((item) => (
                                  <MenuItem value={item.value}>{item.label}</MenuItem>
                                ))}
                              </Field>

                              {touched.duration && errors.duration && (
                                <ShowErrorMessage msg={errors.duration} />
                              )}
                            </div>
                          </Grid>
                          <Grid item xs={12}>
                            <div>
                              <LabelComponent
                                title={"Package SMS Count"}
                                id="buy_sms_count"
                                isRequired
                              />
                              <Field
                                size="small"
                                variant="outlined"
                                id="buy_sms_count"
                                sx={{
                                  mb: 2,
                                  "& input": {
                                    color: "#4F4D4D",
                                  },
                                }}
                                name="buy_sms_count"
                                as={TextField}
                                type="text"
                                fullWidth
                              />
                              {touched.buy_sms_count && errors.buy_sms_count && (
                                <ShowErrorMessage msg={errors.buy_sms_count} />
                              )}
                            </div>
                          </Grid>
                          <Grid item xs={12}>
                            <div>
                              <LabelComponent title={"Package Price BDT"} id="price" isRequired />
                              <Field
                                size="small"
                                variant="outlined"
                                id="price"
                                sx={{
                                  mb: 2,
                                  "& input": {
                                    color: "#4F4D4D",
                                  },
                                }}
                                name="price"
                                as={TextField}
                                type="text"
                                fullWidth
                              />
                            </div>
                            {touched.price && errors.price && (
                              <ShowErrorMessage msg={errors.price} />
                            )}
                          </Grid>
                          <Grid item xs={12}>
                            <div>
                              <LabelComponent title={"Package Status"} id="status" isRequired />
                              <Field
                                size="small"
                                variant="outlined"
                                id="status"
                                sx={{
                                  mb: 2,
                                  "& input": {
                                    color: "#4F4D4D",
                                  },
                                }}
                                name="status"
                                as={Select}
                                fullWidth
                              >
                                <MenuItem value={1}>Active</MenuItem>
                                <MenuItem value={0}>Inactive</MenuItem>
                              </Field>
                            </div>
                            {touched.status && errors.status && (
                              <ShowErrorMessage msg={errors.status} />
                            )}
                          </Grid>
                          <Grid item xs={12}>
                            <LabelComponent title={"Package Services"} isRequired id="services" />
                            <div>
                              {values?.services?.map((item, i) => {
                                return (
                                  <div style={{ margin: "10px 0" }}>
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        marginBottom: "10px",
                                        gap: "10px",
                                      }}
                                    >
                                      <Field
                                        key={i}
                                        size="small"
                                        variant="outlined"
                                        name={`services[${i}]`}
                                        id="services"
                                        sx={{
                                          mb: 0,
                                          width: "70%",
                                          "& input": {
                                            color: "#4F4D4D",
                                          },
                                        }}
                                        as={TextField}
                                        onChange={(e) => {
                                          setFieldValue(
                                            "services",
                                            values?.services?.map((item, index) => {
                                              return index === i
                                                ? { ...item, name: e.target.value }
                                                : item;
                                            })
                                          );
                                        }}
                                        type="text"
                                        value={item?.name}
                                      />

                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: "7px",
                                        }}
                                      >
                                        {item?.status === 1 ? (
                                          <FiCheckCircle color="green" />
                                        ) : (
                                          <RxCrossCircled color="red" />
                                        )}

                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          name={`services_check[${i}]`}
                                          title={item.status === 1 ? "uncheck" : "check"}
                                          checked={item?.status === 1}
                                          onChange={(e) => {
                                            setFieldValue(
                                              "services",
                                              values?.services?.map((item, index) =>
                                                index === i
                                                  ? { ...item, status: e.target.checked ? 1 : 0 }
                                                  : item
                                              )
                                            );
                                          }}
                                        />
                                        {i > 0 && (
                                          <IconButton
                                            onClick={() => {
                                              setFieldValue(
                                                "services",
                                                values.services.filter((_, index) => index !== i)
                                              );
                                            }}
                                          >
                                            <FaMinus color="black" />
                                          </IconButton>
                                        )}
                                        {i === values.services.length - 1 && (
                                          <IconButton
                                            onClick={() => {
                                              setFieldValue(
                                                "services",
                                                values.services.concat({ name: "", status: 1 })
                                              );
                                            }}
                                          >
                                            <FaPlus color="black" />
                                          </IconButton>
                                        )}
                                      </div>
                                    </div>

                                    {touched.services &&
                                      Array.isArray(errors.services) &&
                                      errors.services[i] && (
                                        <div style={{ marginTop: "5px", color: "red" }}>
                                          {errors.services[i].name && (
                                            <ShowErrorMessage msg={errors.services[i].name} />
                                          )}
                                          {errors.services[i].status && (
                                            <ShowErrorMessage msg={errors.services[i].status} />
                                          )}
                                        </div>
                                      )}
                                  </div>
                                );
                              })}
                            </div>
                          </Grid>
                          <Grid item xs={12}>
                            <div>
                              <LabelComponent title={"Package Description"} id="description" />
                              <Field
                                size="small"
                                variant="outlined"
                                id="description"
                                sx={{
                                  mb: 2,
                                  "& input": {
                                    color: "#4F4D4D",
                                  },
                                }}
                                name="description"
                                as={TextField}
                                multiline
                                rows={3}
                                type="text"
                                fullWidth
                              />
                            </div>
                          </Grid>
                        </DialogContent>
                        <DialogActions>
                          <LoadingButton
                            loading={btnLoading}
                            sx={{
                              backgroundColor: success.primary,
                              "&:hover": {
                                backgroundColor: success.primary, // Change hover color
                              },
                              "&:active": {
                                backgroundColor: success.primary, // Change active color
                              },
                            }}
                            variant="contained"
                            type="submit"
                          >
                            Save
                          </LoadingButton>
                        </DialogActions>
                      </Form>
                    )}
                  </Formik>
                </BootstrapDialog>
                <BootstrapDialog
                  onClose={onCloseDetails}
                  aria-labelledby="customized-dialog-titletype"
                  open={isOpenDetails}
                >
                  <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Package Details
                  </DialogTitle>
                  <IconButton
                    aria-label="close"
                    onClick={onCloseDetails}
                    sx={{
                      position: "absolute",
                      right: 8,
                      top: 8,
                      color: (theme) => theme.palette.grey[500],
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                  <DialogContent
                    sx={{
                      width: "500px",
                      overflowY: "auto",
                      maxHeight: "70vh",
                    }}
                    dividers
                  >
                    <div
                      style={{
                        border: "1px solid #cccccc47",
                        borderRadius: "10px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          padding: "10px",
                          borderBottom: "1px solid #cccccc47",
                          backgroundColor: "#f5f5f5b3",
                          display: "flex",
                          alignItems: "center",

                          flexDirection: "column",
                        }}
                      >
                        <Typography variant="h6">{selectedRow?.title}</Typography>
                        <Typography variant="subtitle">
                          {selectedRow?.price} {selectedRow?.currency}
                        </Typography>
                      </div>
                      <div style={{ padding: "10px" }}>
                        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                          {selectedRow?.service_titles?.map((item) => (
                            <li style={{ marginBottom: "7px" }}>
                              {item.status === 1 ? (
                                <FiCheckCircle
                                  size={16}
                                  color="green"
                                  style={{ marginRight: "5px" }}
                                />
                              ) : (
                                <RxCrossCircled
                                  size={16}
                                  color="red"
                                  style={{ marginRight: "5px" }}
                                />
                              )}
                              <span style={{ marginBottom: "7px" }}>{item?.service_name}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div
                        style={{
                          padding: "10px",
                          borderTop: "1px solid #cccccc47",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "#f5f5f5b3",
                        }}
                      >
                        <Typography>
                          Expiry on:{" "}
                          {format(new Date(selectedRow?.expire_date || new Date()), "dd/MM/yyyy")}{" "}
                        </Typography>
                      </div>
                    </div>
                  </DialogContent>
                </BootstrapDialog>
              </Container>
            </TabPanel>

            <TabPanel value="2">
              <Container maxWidth="xl" disableGutters>
                <Stack
                  spacing={3}
                  sx={{
                    backgroundColor: "#fff",
                    padding: "7px 16px",
                    borderRadius: "10px",
                    // boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 6px",
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={4}
                  >
                    <Stack spacing={1}>
                      <Typography
                        variant="h5"
                        // sx={{
                        //   marginLeft: "10px",
                        //   fontSize: "18px",
                        //   fontWeight: "500",
                        //   marginBottom: "0px",
                        // }}
                      >
                        Package Transaction
                      </Typography>
                    </Stack>
                    <Search>
                      <SearchIconWrapper>
                        <SearchIcon />
                      </SearchIconWrapper>
                      <StyledInputBase
                        placeholder="Search…"
                        onChange={(e) => setSearchValue(e.target.value)}
                        value={searchValue}
                        inputProps={{ "aria-label": "search" }}
                      />
                    </Search>
                  </Stack>
                </Stack>
                <Stack
                  sx={{
                    // boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    border:"1px solid #eee",
                    overflowX: "auto",
                    marginTop: "20px",
                    padding: "20px 10px",
                    borderRadius: "10px",
                    maxWidth: "1150px",
                  }}
                >
                  <TableContainer
                    component={Paper}
                    sx={{
                      marginTop: "20px",
                    }}
                  >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">SL&nbsp;</TableCell>
                          <TableCell align="center">
                            <p style={{ whiteSpace: "nowrap" }}>Transaction ID</p>
                          </TableCell>
                          <TableCell align="center">
                            <p style={{ whiteSpace: "nowrap" }}>Transaction Date</p>
                          </TableCell>
                          <TableCell align="center">
                            <p style={{ whiteSpace: "nowrap" }}>Package Name</p>
                          </TableCell>
                          <TableCell align="center">
                            <p style={{ whiteSpace: "nowrap" }}>Package Price</p>
                          </TableCell>
                          <TableCell align="center">
                            <p style={{ whiteSpace: "nowrap" }}>Organization Name</p>
                          </TableCell>
                          <TableCell align="center">
                            <p style={{ whiteSpace: "nowrap" }}>Customer Id</p>
                          </TableCell>
                          <TableCell align="center">
                            <p style={{ whiteSpace: "nowrap" }}>Customer Name</p>
                          </TableCell>
                          <TableCell align="center">
                            <p style={{ whiteSpace: "nowrap" }}>Customer Phone</p>
                          </TableCell>
                          <TableCell align="center">
                            <p style={{ whiteSpace: "nowrap" }}>Customer Email</p>
                          </TableCell>
                          <TableCell align="center">
                            <p style={{ whiteSpace: "nowrap" }}>Expiry Date & Time</p>
                          </TableCell>
                          <TableCell align="center">
                            <p style={{ whiteSpace: "nowrap" }}>Package SMS</p>
                          </TableCell>
                          <TableCell align="center">
                            <p style={{ whiteSpace: "nowrap" }}>Consummation SMS</p>
                          </TableCell>
                          <TableCell align="center">
                            <p style={{ whiteSpace: "nowrap" }}>Remaining SMS</p>
                          </TableCell>
                          <TableCell align="center">Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody
                        sx={{
                          maxHeight: "600px",
                          overflowY: "scroll",
                        }}
                      >
                        {!packageTransaction ||
                          (packageTransaction.length === 0 && (
                            <TableRow>
                              <TableCell colSpan={7} align="center">
                                {" "}
                                No Package Found
                              </TableCell>
                            </TableRow>
                          ))}
                        {packageTransaction.length > 0 &&
                          packageTransaction.map((row, index) => (
                            <TableRow
                              key={row?.id}
                              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                {index + 1}
                              </TableCell>
                              <TableCell align="center">{row.transaction_id}</TableCell>
                              <TableCell align="center">
                                <p style={{ whiteSpace: "nowrap" }}>
                                  {format(parseISO(row.created_at), "dd/MM/yyyy hh:mm a")}
                                </p>
                              </TableCell>
                              <TableCell align="center">
                                <p style={{ whiteSpace: "nowrap" }}>{row?.package_name}</p>
                              </TableCell>
                              <TableCell align="center">
                                <p style={{ whiteSpace: "nowrap" }}>
                                  {row.currency} {row.amount}
                                </p>
                              </TableCell>
                              <TableCell align="center">{row.organization_name}</TableCell>
                              <TableCell align="center">{row.organization_id}</TableCell>
                              <TableCell align="center">
                                {row?.organization_details?.name}
                              </TableCell>
                              <TableCell align="center">
                                {row?.organization_details?.mobile}
                              </TableCell>
                              <TableCell align="center">
                                {row?.organization_details?.email}
                              </TableCell>
                              <TableCell align="center">
                                {format(parseISO(row.expire_date), "dd/MM/yyyy hh:mm a")}
                              </TableCell>
                              <TableCell align="center">{row?.buy_total_sms}</TableCell>
                              <TableCell align="center">{row?.total_use_sms}</TableCell>
                              <TableCell align="center">{row?.total_available_sms}</TableCell>
                              <TableCell align="center">
                                <div
                                  style={{
                                    whiteSpace: "nowrap",
                                    padding: "5px 10px",

                                    borderRadius: "12px",
                                    color: "white",
                                    backgroundColor: `${
                                      new Date(row.expire_date) < new Date() ? "red" : "green"
                                    }`,
                                  }}
                                >
                                  <small>
                                    {new Date(row.expire_date) < new Date() ? "Expired" : "Active"}
                                  </small>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Stack>
              </Container>
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </>
  );
};

const ShowErrorMessage = ({ msg }) => {
  return (
    <div
      style={{
        color: "red",
        fontSize: "12px",
        marginTop: "-10px",
        marginBottom: "10px",
      }}
    >
      {msg}
    </div>
  );
};

const LabelComponent = ({ title, id, isRequired }) => {
  return (
    <label htmlFor={id ? id : ""} style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
      {title} {isRequired ? <span style={{ color: "red" }}>*</span> : null}
    </label>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default connect(mapStateToProps, mapDispatchToProps)(Page);
