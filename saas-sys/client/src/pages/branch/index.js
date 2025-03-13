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
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { CiMenuKebab } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
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
  Autocomplete,
  TablePagination,
  Menu,
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
import { default as ReactSelect } from "react-select";
import {
  PostBranch,
  UpdateBranchAPI,
  fetchAllBranch,
  fetchAllOrganization,
} from "src/common/apiCall/api";
import { format, parseISO } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";
import { neutral, success } from "src/theme/colors";
import { useAuth } from "src/hooks/use-auth";

// const DatePickerField = ({ field, form, ...other }) => {
//   const { name, value } = field;
//   const { setFieldValue, setFieldTouched } = form;

//   const handleChange = (date) => {
//     setFieldValue(name, date);
//   };

//   const handleBlur = () => {
//     setFieldTouched(name, true);
//   };

//   return (
//     <div>
//       <DatePicker
//         {...other}
//         selected={value}
//         onChange={handleChange}
//         placeholderText="DD/MM/YYYY"
//         onBlur={handleBlur}
//         dateFormat="dd/MM/yyyy"
//         minDate={new Date()}
//         calendarContainer={document.getElementById("calendar-container")}
//         customInput={
//           <TextField
//             fullWidth
//             variant="outlined"
//             disabled // Disable input field
//             InputProps={{
//               sx: {
//                 "& input": {
//                   width: "430px", // Full width
//                   padding: "10px",
//                   border: "none", // Remove border
//                 },
//               },
//             }}
//           />
//         }
//         customInputRef={(ref) => {
//           if (ref && ref.input) {
//             ref.input.readOnly = true; // Make input read-only
//           }
//         }}
//         renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
//           <div>
//             <Button
//               onClick={decreaseMonth}
//               variant="text"
//               sx={{ border: "none" }} // Remove border from button
//             >
//               Previous
//             </Button>
//             <span>{date.toLocaleDateString()}</span>
//             <Button
//               onClick={increaseMonth}
//               variant="text"
//               sx={{ border: "none" }} // Remove border from button
//             >
//               Next
//             </Button>
//           </div>
//         )}
//       />
//     </div>
//   );
// };

const SearchAbleSelectField = ({ field, form, ...other }) => {
  const { name, value } = field;
  const { setFieldValue, setFieldTouched } = form;
  const [organization, setOrganization] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const fetchOrganization = async () => {
    fetchAllOrganization()
      .then((res) => {
        const modifiedData = res?.data?.map((item) => ({
          ...item,
          label: item.name,
          title: item.name,
          value: item.id,
        }));
        setOrganization(modifiedData);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchOrganization();
    return () => {};
  }, []);
  return (
    <div>
      <ReactSearchAutocomplete
        {...other}
        showIcon={false}
        placeholder={"Search Organizations"}
        items={organization}
        inputSearchString={searchTerm || ""}
        onSearch={(value) => setSearchTerm(value)}
        onBlur={() => setFieldTouched(name, true)}
        searchInputProps={{
          className: "form-control",
          placeholder: "Search Organizations",
        }}
        resultStringKeyName="title"
        onSelect={(item) => {
          setFieldValue(name, item.id);
        }}
        maxResults={5}
        fuseOptions={{
          keys: ["title"],
        }}
        styling={{
          borderRadius: "5px !important",
          zIndex: "20",
          width: "100%",
          boxShadow: "none",
          padding: "10px !important",
        }}
      >
        {(inputProps, inputRef) => (
          <TextField
            {...inputProps}
            sx={{
              padding: "10px !important",
            }}
            ref={(el) => {
              inputRef(el);
              searchInputRef.current = el;
            }}
          />
        )}
      </ReactSearchAutocomplete>
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
  name: null,
  address: null,
  email: null,
  organization_id: null,
  contact_person_name: null,
  phone: null,
};

const Page = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDetails, setIsOpenDetails] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [branchList, setBranchList] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [count, setCount] = useState(0);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [organization, setOrganization] = useState([]);
  const [listAction, setListAction] = useState(null);
  const auth = useAuth();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };
  const handleChangeOrganization = (data) => {
    if (data) {
      setSelectedOrganization(data);
      setPage(1);
      setRowsPerPage(5);
    } else {
      setSelectedOrganization(null);
    }
  };

  const onRefetch = () => setRefresh((prev) => !prev);
  const fetchOrganization = async () => {
    fetchAllOrganization()
      .then((res) => {
        const modifiedData = res?.data?.map((item) => ({
          ...item,
          label: item.name,
          title: item.name,
          value: item.id,
        }));
        setOrganization(modifiedData);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchOrganization();
    return () => {};
  }, []);

  useEffect(() => {
    const queryParam = `page=${page}&rowsPerPage=${rowsPerPage}&organization_id=${
      selectedOrganization?.id || ""
    }`;
    fetchAllBranch(queryParam)
      .then((res) => {
        setBranchList(res?.data?.data);
        setCount(res?.data?.total);
      })
      .catch((err) => console.log(err));
    return () => {};
  }, [refresh, page, rowsPerPage, selectedOrganization?.id]);

  const onClose = () => {
    setIsOpen(false);
  };

  const onCloseDetails = () => {
    setIsOpenDetails(false);
    setSelectedRow(null);
    setListAction(null);
  };
  const handleOpenDetails = (data) => {
    setSelectedRow(data);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required").min(3, "Name must be at least 3 characters"),
    organization_id:
      auth?.user?.user?.user_type === 0
        ? Yup.string().required("Organization is required")
        : Yup.string().nullable(),
    contact_person_name: Yup.string().required("Contact Person Name is required"),
    phone: Yup.string()
      .required("Phone is required")
      .min(10, "Phone must be at least 10 characters")
      .max(15, "Phone must be at least 15 characters"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    address: Yup.string().nullable(),
  });

  const handleSubmit = (data) => {
    let modifiedData = { ...data };
    if (auth.user.user.user_type === 0) {
      const findOrganization = organization.find((item) => item.id === data.organization_id);
      modifiedData = {
        ...modifiedData,
        organization_name: findOrganization?.name,
      };
    } else {
      modifiedData = {
        ...modifiedData,
        organization_name: auth?.user?.user?.organization?.name,
        organization_id: auth.user.user.organization_id,
      };
    }
    setBtnLoading(true);
    PostBranch(modifiedData)
      .then((res) => {
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

  return (
    <>
      <Box sx={{backgroundColor:"white", mx:"10px", my:"20px", borderRadius:"30px"}}>
      <Head>
        <title>
          <title>Branch</title>
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
          //change
          marginTop: "1%",
          overflowX: "hidden",
        }}
      >
        <Container maxWidth="xl" sx={{ overflowX: "hidden" }}>
          <Stack
            spacing={3}
            sx={{
              backgroundColor: "#fff",
              padding: "7px 16px",
              borderRadius: "10px",
              // border:"1px solid #eee"
              // boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 6px",
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={4}>
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
                  Branch Setup
                </Typography>
              </Stack>
              <Button
                onClick={() => setIsOpen(true)}
                variant="contained"
                sx={{
                  borderRadius: "10px",
                  backgroundColor: success.primary,
                  "&:hover": {
                    backgroundColor: success.primary, // Change hover color
                  },
                  "&:active": {
                    backgroundColor: success.primary, // Change active color
                  },
                }}
              >
                Add Branch
              </Button>
            </Stack>
          </Stack>

          <TableContainer
            component={Paper}
            sx={{
              marginTop: "20px",
              borderRadius: "10px",
              border:"1px solid #eee"
              // boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: auth?.user?.user?.user_type === 0 ? "space-between" : "flex-end",
                alignItems: "center",
                padding: "15px 0",
                // borderRadius: "20px",
              }}
            >
              {auth?.user?.user?.user_type === 0 ? (
                <ReactSelect
                  className="basic-single"
                  classNamePrefix="select"
                  isClearable
                  isSearchable
                  placeholder="Select Organization"
                  styles={{
                    control: (base) => ({
                      ...base,
                      width: "230px",
                      marginLeft: "15px",
                      borderRadius: "20px",
                      paddingLeft: "2px"
                    }),
                  }}
                  name="organization"
                  options={organization || []}
                  onChange={handleChangeOrganization}
                  value={selectedOrganization}
                />
              ) : null}
              <TablePagination
                component="div"
                count={count}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
              />
            </div>
            <Table sx={{ maxWidth: "100%", overflowX: "auto" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">SL&nbsp;</TableCell>
                  <TableCell align="center">Name &nbsp;</TableCell>
                  <TableCell align="center">Organization&nbsp;</TableCell>
                  <TableCell align="center">
                    <span style={{ whiteSpace: "nowrap" }}>Contact Person</span>&nbsp;
                  </TableCell>
                  <TableCell align="center">Phone&nbsp;</TableCell>
                  <TableCell align="center">Email&nbsp;</TableCell>
                  <TableCell align="center">Address&nbsp;</TableCell>
                  <TableCell align="center">Action&nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!branchList ||
                  (branchList.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        {" "}
                        No Branch Found
                      </TableCell>
                    </TableRow>
                  ))}
                {branchList.length > 0 &&
                  branchList.map((row, index) => (
                    <TableRow
                      key={row?.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">{row?.organization?.name}</TableCell>
                      <TableCell align="center">{row?.contact_person_name}</TableCell>
                      <TableCell align="center">
                        <span style={{ whiteSpace: "nowrap" }}>{row.phone}</span>
                      </TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">{row.address}</TableCell>
                      {/* <TableCell align="center">
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
                              backgroundColor: row.status === 1 ? success.primary : neutral["50"],
                            },
                          }}
                          size="large"
                        />
                      </TableCell> */}
                      <TableCell align="center">
                        <div>
                          <IconButton
                            variant="contained"
                            aria-label="more"
                            aria-controls="subscription-menu"
                            aria-haspopup="true"
                            onClick={(event) => {
                              setListAction(event.currentTarget);
                              handleOpenDetails(row);
                            }}
                          >
                            <CiMenuKebab />
                          </IconButton>
                          <Menu
                            id="subscription-menu"
                            anchorEl={listAction}
                            open={listAction ?? false}
                            onClose={() => setListAction(null)}
                            sx={{
                              marginTop: "37px",
                            }}
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                          >
                            <MenuItem
                              onClick={() => {
                                setIsOpenDetails(true);
                                setListAction(null);
                              }}
                            >
                              <FaEdit size={20} style={{ marginRight: "30px" }} color="#9DA4AE" />
                              Update Info
                            </MenuItem>
                          </Menu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <br />
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
              Add Branch
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
              initialValues={{
                ...initialValues,
                organization_id: auth?.user?.user?.organization_id,
              }}
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
                        <LabelComponent title={"Branch Name"} id="name" isRequired />
                        <Field
                          size="small"
                          variant="outlined"
                          id="name"
                          placeholder="Enter branch name"
                          sx={{
                            mb: 2,
                            "& input": {
                              color: "#4F4D4D",
                            },
                          }}
                          name="name"
                          as={TextField}
                          type="text"
                          fullWidth
                        />
                        {touched.name && errors.name && <ShowErrorMessage msg={errors.name} />}
                      </div>
                    </Grid>
                    {auth.user.user.user_type === 0 ? (
                      <Grid item xs={12}>
                        <div>
                          <LabelComponent
                            title={"Select Organization"}
                            id="organization"
                            isRequired
                          />
                          <Field
                            component={SearchAbleSelectField}
                            values={values}
                            touched={touched}
                            errors={errors}
                            setFieldValue={setFieldValue}
                            name="organization_id"
                          />
                          <br />
                          {touched.organization_id && errors.organization_id && (
                            <ShowErrorMessage msg={errors.organization_id} />
                          )}
                        </div>
                      </Grid>
                    ) : null}
                    <Grid item xs={12}>
                      <div>
                        <LabelComponent
                          title={"Contact Person Name"}
                          id="contact_person"
                          isRequired
                        />
                        <Field
                          size="small"
                          variant="outlined"
                          id="contact_person"
                          placeholder="Enter contact person name"
                          sx={{
                            mb: 2,
                            "& input": {
                              color: "#4F4D4D",
                            },
                          }}
                          name="contact_person_name"
                          as={TextField}
                          fullWidth
                        />

                        {touched.contact_person_name && errors.contact_person_name && (
                          <ShowErrorMessage msg={errors.contact_person_name} />
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <div>
                        <LabelComponent title={"Phone Number"} id="phone" isRequired />
                        <Field
                          size="small"
                          variant="outlined"
                          id="phone"
                          placeholder="Enter phone number"
                          sx={{
                            mb: 2,
                            "& input": {
                              color: "#4F4D4D",
                            },
                          }}
                          name="phone"
                          as={TextField}
                          type="text"
                          fullWidth
                        />
                        {touched.phone && errors.phone && <ShowErrorMessage msg={errors.phone} />}
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <div>
                        <LabelComponent title={"Email"} id="email" isRequired />
                        <Field
                          size="small"
                          variant="outlined"
                          id="email"
                          placeholder="Enter email"
                          sx={{
                            mb: 2,
                            "& input": {
                              color: "#4F4D4D",
                            },
                          }}
                          name="email"
                          as={TextField}
                          type="email"
                          fullWidth
                        />
                      </div>
                      {touched.email && errors.email && <ShowErrorMessage msg={errors.email} />}
                    </Grid>
                    <Grid item xs={12}>
                      <div>
                        <LabelComponent title={"Address"} id="address" />
                        <Field
                          size="small"
                          variant="outlined"
                          id="address"
                          sx={{
                            mb: 2,
                            "& input": {
                              color: "#4F4D4D",
                            },
                          }}
                          name="address"
                          as={TextField}
                          multiline
                          rows={3}
                          type="text"
                          fullWidth
                        />
                      </div>
                      {touched.address && errors.address && (
                        <ShowErrorMessage msg={errors.address} />
                      )}
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
              Update Branch Information
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
            {selectedRow && (
              <UpdateBranchFrom onClose={onCloseDetails} onRefetch={onRefetch} data={selectedRow} />
            )}
          </BootstrapDialog>
        </Container>
      </Box>
      </Box>
    </>
  );
};

const UpdateBranchFrom = ({ data, onRefetch, onClose }) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required").min(3, "Name must be at least 3 characters"),
    contact_person_name: Yup.string().required("Contact Person Name is required"),
    phone: Yup.string()
      .required("Phone is required")
      .min(10, "Phone must be at least 10 characters")
      .max(15, "Phone must be at least 15 characters"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    address: Yup.string().nullable(),
  });
  const initialValues = {
    name: data?.name || null,
    address: data?.address || null,
    email: data?.email || null,
    contact_person_name: data?.contact_person_name || null,
    phone: data?.phone || null,
  };
  const handleSubmit = (fromData) => {
    setBtnLoading(true);
    UpdateBranchAPI(fromData, data.id)
      .then((res) => {
        if (res.code === 200) {
          onRefetch();
          onClose();
          setBtnLoading(false);
        }
      })
      .catch((err) => {
        setBtnLoading(false);
      });
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ values, errors, touched, setFieldValue, handleSubmit }) => (
        <Form onSubmit={handleSubmit} encType="multipart/form-data" method="post">
          <DialogContent
            sx={{
              width: "550px",
              overflowY: "auto",
              maxHeight: "70vh",
            }}
            dividers
          >
            <Grid item xs={12}>
              <div>
                <LabelComponent title={"Branch Name"} id="name" isRequired />
                <Field
                  size="small"
                  variant="outlined"
                  id="name"
                  placeholder="Enter branch name"
                  sx={{
                    mb: 2,
                    "& input": {
                      color: "#4F4D4D",
                    },
                  }}
                  name="name"
                  as={TextField}
                  type="text"
                  fullWidth
                />
                {touched.name && errors.name && <ShowErrorMessage msg={errors.name} />}
              </div>
            </Grid>
            <Grid item xs={12}>
              <div>
                <LabelComponent title={"Contact Person Name"} id="contact_person" isRequired />
                <Field
                  size="small"
                  variant="outlined"
                  id="contact_person"
                  placeholder="Enter contact person name"
                  sx={{
                    mb: 2,
                    "& input": {
                      color: "#4F4D4D",
                    },
                  }}
                  name="contact_person_name"
                  as={TextField}
                  fullWidth
                />

                {touched.contact_person_name && errors.contact_person_name && (
                  <ShowErrorMessage msg={errors.contact_person_name} />
                )}
              </div>
            </Grid>
            <Grid item xs={12}>
              <div>
                <LabelComponent title={"Phone Number"} id="phone" isRequired />
                <Field
                  size="small"
                  variant="outlined"
                  id="phone"
                  placeholder="Enter phone number"
                  sx={{
                    mb: 2,
                    "& input": {
                      color: "#4F4D4D",
                    },
                  }}
                  name="phone"
                  as={TextField}
                  type="text"
                  fullWidth
                />
                {touched.phone && errors.phone && <ShowErrorMessage msg={errors.phone} />}
              </div>
            </Grid>
            <Grid item xs={12}>
              <div>
                <LabelComponent title={"Email"} id="email" isRequired />
                <Field
                  size="small"
                  variant="outlined"
                  id="email"
                  placeholder="Enter email"
                  sx={{
                    mb: 2,
                    "& input": {
                      color: "#4F4D4D",
                    },
                  }}
                  name="email"
                  as={TextField}
                  type="email"
                  fullWidth
                />
              </div>
              {touched.email && errors.email && <ShowErrorMessage msg={errors.email} />}
            </Grid>
            <Grid item xs={12}>
              <div>
                <LabelComponent title={"Address"} id="address" />
                <Field
                  size="small"
                  variant="outlined"
                  id="address"
                  sx={{
                    mb: 2,
                    "& input": {
                      color: "#4F4D4D",
                    },
                  }}
                  name="address"
                  as={TextField}
                  multiline
                  rows={3}
                  type="text"
                  fullWidth
                />
              </div>
              {touched.address && errors.address && <ShowErrorMessage msg={errors.address} />}
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
              Update
            </LoadingButton>
          </DialogActions>
        </Form>
      )}
    </Formik>
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
