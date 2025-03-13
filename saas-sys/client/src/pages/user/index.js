import { useCallback, useMemo, useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import Alert from "../../components/Alert";
import Alert2 from "../../components/Alert2";
import {
  userDeleteApiCall,
  fetchUserAPIGet,
  fetchUserOrganizationDetailsAPIGet,
} from "../../common/apiCall/api";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import { UserTable } from "../../sections/user/user-table";
import { USER } from "../../common/constantData/language";
import { ADMIN } from "../../common/constantData/screenUrl";
import getGlobalState from "../../stateManagement/global/globalSelector";
import getAuthState from "../../stateManagement/auth/AuthSelector";
import {
  setUserProfileToReducer,
  userOrganizationSetToReducer,
} from "../../stateManagement/auth/AuthActionCreators";
import { connect } from "react-redux";
import { setIsAuthenticated } from "../../stateManagement/global/GlobalActionCreators";
import Loading from "src/components/Loading";
import { neutral, success } from "src/theme/colors";

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
  isAuthenticated: getGlobalState(state)?.isAuthenticated,
  testData: getGlobalState(state)?.testData,
  userOrganization: getAuthState(state)?.userOrganization,
});

const mapDispatchToProps = (dispatch) => ({
  setUserProfileToReducerProp: (data) => dispatch(setUserProfileToReducer(data)),
  setIsAuthenticatedProp: (data) => dispatch(setIsAuthenticated(data)),
  userOrganizationSetToReducerProp: (data) => dispatch(userOrganizationSetToReducer(data)),
});

const Page = (props) => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [usersIds, setUsersIds] = useState([]);
  const usersSelection = useSelection(usersIds);
  const [modal, setModal] = React.useState(false);
  const [deletingUserId, setDeletingUserId] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLeft, setUserLeft] = useState(1);

  const fetchUsers = (queryparam = null) => {
    fetchUserAPIGet(queryparam)
      .then((response) => {
        if (response?.code == 200) {
          setData(response?.data?.users);

          setUsersIds(response?.data?.users?.data.map((user) => user.id));
          setLoading(false);
        }
      })
      .catch(() => {});
  };
  useEffect(() => {
    fetchUserOrganizationDetailsAPIGet()
      .then((response) => {
        if (response?.code == 200) {
          props.userOrganizationSetToReducerProp(response?.data);
          let userCountLeft =
            parseInt(response.data?.user?.latestSubscriptionDetails?.user_limit ?? 0) -
            response.data?.user?.user_count;
          console.log(userCountLeft, "......................", response);
          setUserLeft(userCountLeft);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    let query = "perpage=" + rowsPerPage;
    if (searchQuery && searchQuery.length > 3) {
      query = query + "&search=" + searchQuery;
    }

    if (status == 0 || status == 1) {
      query = query + "&status=" + status;
    }
    if (page) {
      query = query + "&page=" + page;
    }

    fetchUsers(query);
  }, [status, searchQuery, refresh, rowsPerPage, page]);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
    setPage(1);
  }, []);

  const handleClose = () => {
    setModal(false);
    setDeletingUserId(null);
  };

  const handleMultipleUserChange = (status) => {
    if (selectedRows.length > 0) {
      userDeleteApiCall({ id: selectedRows, status: status })
        .then((res) => {
          if (res.code === 200) {
            setResponseMessage(USER.ADD_DELETE_MESSAGE);
            setOpenAlert1(true);
            setRefresh(!refresh);
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
        .catch((error) => {
          setResponseMessage(USER.ADD_ERROR_MESSAGE);
          setOpenAlert2(true);
        })
        .finally(() => {
          handleClose();
        });
    }
  };

  const [responseMessage, setResponseMessage] = useState("");
  const [openAlert1, setOpenAlert1] = useState(false);
  const [openAlert2, setOpenAlert2] = useState(false);

  const handleAlertClose = () => {
    setResponseMessage("");
    setOpenAlert1(false);
    setOpenAlert2(false);
  };

  return (
    <>
      <Box sx={{ backgroundColor: "white", mx: "10px", my: "20px", borderRadius: "30px" }}>
        <Head>
          <title>
            <title>{USER.USER_TITLE}</title>
          </title>
          <div></div>
        </Head>
        {loading === false ? (
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              py: 8,
              //change
              marginTop: "1%",
            }}
          >
            <Container maxWidth="xl">
              <Stack spacing={3}>
                <Stack direction="row" justifyContent="space-between" spacing={4}>
                  <Stack spacing={1}>
                    <Typography variant="h5" sx={{ marginLeft: "10px" }}>
                      {USER.USER_TITLE}
                    </Typography>
                  </Stack>
                  <div>
                    {(!props.userOrganization?.user?.organization_id || userLeft > 0) && (
                      <Link href={ADMIN.USER_ADD_URL} style={{ textDecoration: "none" }}>
                        <Button
                          startIcon={
                            <SvgIcon fontSize="12px">
                              <PlusIcon />
                            </SvgIcon>
                          }
                          variant="contained"
                          sx={{
                            // background: "#70b42c",
                            // color: "white",
                            // borderRadius: "5px",
                            // fontSize: "12px",
                            // padding: "5px",
                            // px:"10px",
                            // marginRight: "0px",
                            // "&:hover": {
                            //   background: "#70b42c",
                            // },
                            backgroundColor: success.primary,
                            "&:hover": {
                              backgroundColor: success.primary, // Change hover color
                            },
                            "&:active": {
                              backgroundColor: success.primary, // Change active color
                            },
                          }}
                        >
                          {USER.User_Add_Button}
                        </Button>
                      </Link>
                    )}
                    <Typography inline variant="body1" align="right" color="tomato">
                      {props.userOrganization?.user?.organization_id &&
                        userLeft > 0 &&
                        userLeft + " User left"}
                      {props.userOrganization?.user?.organization_id &&
                        userLeft <= 0 &&
                        "User limit exceed, If you want to create user contact admin"}
                    </Typography>
                  </div>
                </Stack>

                <UserTable
                  data={data}
                  onPageChange={(pageno) => {
                    setPage(pageno);
                  }}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  onSearch={(query) => {
                    setSearchQuery(query);
                    setPage(1);
                  }}
                  selected={usersSelection.selected}
                  statusFilter={(status) => {
                    setStatus(status);
                    setPage(1);
                  }}
                  onDelete={(data) => {
                    setDeletingsubscription(data);
                    setModal(true);
                  }}
                  selectedRows={selectedRows}
                  setSelectedRows={(item) => setSelectedRows(item)}
                  multipleStatusChange={(status) => {
                    handleMultipleUserChange(status);
                  }}
                />

                <BootstrapDialog
                  onClose={handleClose}
                  aria-labelledby="customized-dialog-title"
                  open={modal}
                >
                  <DialogTitle id="alert-dialog-slide-title">
                    {"Are you sure you want to delete the feature?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleMultipleUserChange} autoFocus>
                      Agree
                    </Button>
                  </DialogActions>
                </BootstrapDialog>
                <Alert open={openAlert1} onClose={handleAlertClose} message={responseMessage} />
                <Alert2 open={openAlert2} onClose={handleAlertClose} message={responseMessage} />
              </Stack>
            </Container>
          </Box>
        ) : (
          <Loading />
        )}
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default connect(mapStateToProps, mapDispatchToProps)(Page);
