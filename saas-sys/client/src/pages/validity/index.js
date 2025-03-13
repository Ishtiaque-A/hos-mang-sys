import { useCallback, useMemo, useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { UserSearch } from "src/sections/user/user-search";
import {
  userDeleteApiCall,
  fetchValidityLimitAPIGet,
  fetchUserOrganizationDetailsAPIGet,
} from "../../common/apiCall/api";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import { useRouter } from "next/router";
import { ValidityTable } from "../../sections/validity/validity-table";
import { VALIDITY, STORAGE } from "../../common/constantData/language";
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
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const users = useFeatures(pageNumber, rowsPerPage);
  const usersIds = useFeatureIds(users);
  const usersSelection = useSelection(usersIds);
  const [modal, setModal] = React.useState(false);
  const [deletingUserId, setDeletingUserId] = useState(null);
  const [userLeft, setUserLeft] = useState(1);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    fetchValidityLimitAPIGet()
      .then((response) => {
        if (response.code) {
          setData(response?.data?.validity);
          setFilteredData(response?.data?.validity);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    fetchUserOrganizationDetailsAPIGet()
      .then((response) => {
        if (response?.code == 200) {
          props.userOrganizationSetToReducerProp(response?.data);
        }
        console.log("userOrganizationSetToReducerProp", response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log(props.userOrganization);
    if (props.userOrganization?.user?.organization_id) {
      let userCountLeft =
        parseInt(props.userOrganization?.subscriptionPlan?.user_limit ?? 0) -
        props.userOrganization?.user_count;
      setUserLeft(userCountLeft);
    }
  }, [props.userOrganization]);

  useEffect(() => {
    // Perform search whenever searchQuery changes
    const performSearch = () => {
      const filteredData = data.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filteredData);
    };

    performSearch();
  }, [searchQuery]);

  useEffect(() => {
    console.log("userOrganization:", props?.userOrganization);
  }, [props]);

  function useFeatures(pageNumber, rowsPerPage) {
    return useMemo(() => {
      const startIndex = pageNumber * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;
      return filteredData.slice(startIndex, endIndex);
    }, [filteredData, pageNumber, rowsPerPage]);
  }

  function useFeatureIds(users) {
    return useMemo(() => {
      return users.map((user) => user.id);
    }, [users]);
  }

  const handlePageChange = useCallback((event, value) => {
    setPageNumber(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
    setPageNumber(0);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPageNumber(0); // Reset page to 0 when search query changes
  };

  const handleClose = () => {
    setModal(false);
    setDeletingUserId(null);
  };

  return (
    <>
      <Box sx={{ backgroundColor: "white", mx: "10px", my: "20px", borderRadius: "30px" }}>
        <Head>
          <title>
            <title>{VALIDITY.TITLE}</title>
          </title>
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
                      {VALIDITY.TITLE}
                    </Typography>
                  </Stack>
                  <div>
                    {(!props.userOrganization?.user?.organization_id || userLeft > 0) && (
                      <Link href={ADMIN.VALIDITY_ADD_URL} style={{ textDecoration: "none" }}>
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
                            // borderRadius: "10px",
                            // fontSize: "12px",
                            // padding: "5px",
                            // px:"10px",
                            // marginRight: "20px",
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
                          {VALIDITY.ADD_TITLE}
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

                <ValidityTable
                  count={data.length}
                  items={users}
                  onDeselectAll={usersSelection.handleDeselectAll}
                  onDeselectOne={usersSelection.handleDeselectOne}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  onSelectAll={usersSelection.handleSelectAll}
                  onSelectOne={usersSelection.handleSelectOne}
                  page={pageNumber}
                  onSearch={handleSearch}
                  rowsPerPage={rowsPerPage}
                  selected={usersSelection.selected}
                  onDelete={(id) => {
                    setDeletingUserId(id);
                    setModal(true);
                  }}
                />

                {/* <BootstrapDialog
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
                <Button onClick={handleDeleteFeature} autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </BootstrapDialog> */}
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
