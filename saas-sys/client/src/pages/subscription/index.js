import { useCallback, useMemo, useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import {
  fetchSubscriptionAPIGet,
  subscriptionPlanDeleteApiCall,
  subscriptionPlanMultipleStatusChanteApiCall,
} from "../../common/apiCall/api";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import { useRouter } from "next/router";
import SubscriptionTable from "../../sections/subscription/subscription-table";
import { SUBSCRIPTION_PLAN } from "../../common/constantData/language";
import { ADMIN } from "../../common/constantData/screenUrl";
import Alert from "../../components/Alert";
import Alert2 from "../../components/Alert2";
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

const Page = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(null);
  const [status, setStatus] = useState(null);
  const [type, setType] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [subscriptionsIds, setSubscriptionId] = useState([]);
  const subscriptionsSelection = useSelection(subscriptionsIds);
  const [modal, setModal] = React.useState(false);
  const [deletingsubscription, setDeletingsubscription] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSubscriptionPlan = (queryparam = null) => {
    fetchSubscriptionAPIGet(queryparam)
      .then((response) => {
        if (response?.code == 200) {
          setData(response?.data?.subscription_plans);
          setLoading(false);
          setSubscriptionId(
            response?.data?.subscription_plans?.data.map((subscription) => subscription.id)
          );
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    let query = "perpage=" + rowsPerPage;
    if (searchQuery && searchQuery.length > 3) {
      query = query + "&search=" + searchQuery;
    }

    if (status == 0 || status == 1) {
      query = query + "&status=" + status;
    }
    if (type && [2, 1].includes(type)) {
      query = query + "&type=" + type;
    }
    if (page) {
      query = query + "&page=" + page;
    }

    fetchSubscriptionPlan(query);
  }, [status, type, searchQuery, refresh, rowsPerPage, page]);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
    setPage(1);
  }, []);

  const handleClose = () => {
    setModal(false);
    setDeletingsubscription(null);
  };

  const handleDeletesubScriptionPlan = () => {
    if (deletingsubscription) {
      subscriptionPlanDeleteApiCall({ id: deletingsubscription?.id })
        .then((res) => {
          if (res.code === 200) {
            setResponseMessage(SUBSCRIPTION_PLAN.ADD_DELETE_MESSAGE);
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
          setResponseMessage(SUBSCRIPTION_PLAN.ADD_ERROR_MESSAGE);
          setOpenAlert2(true);
        })
        .finally(() => {
          handleClose();
        });
    }
  };

  const handleMultipleStatusChange = (status) => {
    if (selectedRows.length > 0) {
      console.log(selectedRows, status, ">>>>>>>>>>>>>>>>>>134s");
      subscriptionPlanMultipleStatusChanteApiCall({ id: selectedRows, status: status })
        .then((res) => {
          if (res.code === 200) {
            setResponseMessage(SUBSCRIPTION_PLAN.ADD_DELETE_MESSAGE);
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
          setResponseMessage(SUBSCRIPTION_PLAN.ADD_ERROR_MESSAGE);
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
            <title>{SUBSCRIPTION_PLAN.TITLE}</title>
          </title>
        </Head>
        {loading === false ? (
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              py: 8,
              marginTop: "1%",
              // bgcolor: "white",
              mt: "1px",
            }}
          >
            <Container maxWidth="xl">
              <Stack spacing={3}>
                <Stack direction="row" justifyContent="space-between" spacing={4}>
                  <Stack spacing={1}>
                    <Typography variant="h5" sx={{ marginLeft: "10px" }}>
                      {SUBSCRIPTION_PLAN.TITLE}
                    </Typography>
                  </Stack>
                  <div>
                    <Link href={ADMIN.SUBSCRIPTION_ADD_URL} style={{ textDecoration: "none" }}>
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
                          // // padding: "5px 15px 5px 15px",
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
                        {SUBSCRIPTION_PLAN.ADD_BUTTON}
                      </Button>
                    </Link>
                  </div>
                </Stack>
                <SubscriptionTable
                  data={data}
                  onPageChange={(pageno) => {
                    setPage(pageno);
                  }}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  onSearch={(query) => {
                    setSearchQuery(query);
                    setPage(1);
                  }}
                  selected={subscriptionsSelection.selected}
                  statusFilter={(status) => {
                    setStatus(status);
                    setPage(1);
                  }}
                  typeFilter={(type) => {
                    setType(type);
                    setPage(1);
                  }}
                  onDelete={(data) => {
                    setDeletingsubscription(data);
                    setModal(true);
                  }}
                  selectedRows={selectedRows}
                  setSelectedRows={(item) => setSelectedRows(item)}
                  multipleStatusChange={(status) => {
                    handleMultipleStatusChange(status);
                  }}
                />

                <BootstrapDialog
                  onClose={handleClose}
                  aria-labelledby="customized-dialog-title"
                  open={modal}
                >
                  <DialogTitle id="alert-dialog-slide-title">
                    {deletingsubscription?.status == 0
                      ? "Do you want to Activate this plan?"
                      : "Do you want to Inactive this plan?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDeletesubScriptionPlan} autoFocus>
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

export default Page;
