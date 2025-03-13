import { useCallback, useMemo, useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { FeatureTable } from "src/sections/feature/feature-table";
import { FeatureSearch } from "src/sections/feature/feature-search";
import { featurDeleteApiCall, fetchFeatureAPIGet } from "../../common/apiCall/api";
import { FEATURE } from "../../common/constantData/language";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import { useRouter } from "next/router";
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
  const [status, setStatus] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [featuresIds, setFeaturesIds] = useState([]);
  const featuresSelection = useSelection(featuresIds);
  const [modal, setModal] = React.useState(false);
  const [deletingFeatureId, setDeletingFeatureId] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const fetchFeaturesPlan = (queryparam = null) => {
    fetchFeatureAPIGet(queryparam)
      .then((response) => {
        if (response?.code == 200) {
          setData(response?.data?.features);
          setFeaturesIds(response?.data?.features?.data.map((feature) => feature.id));
          setLoading(false);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    let query = "perpage=" + rowsPerPage;
    if (searchQuery && searchQuery.length > 1) {
      query = query + "&search=" + searchQuery;
    }

    if (status == 0 || status == 1) {
      query = query + "&status=" + status;
      console.log(query, "query");
    }
    if (page) {
      query = query + "&page=" + page;
    }

    fetchFeaturesPlan(query);
  }, [status, searchQuery, refresh, rowsPerPage, page]);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
    setPage(1);
  }, []);

  const handleClose = () => {
    setModal(false);
    setDeletingFeatureId(null);
  };

  const handleDeleteFeature = (status) => {
    if (selectedRows.length > 0) {
      console.log(selectedRows, status, ">>>>>>>>>>>>>>>>>>134s");
      featurDeleteApiCall({ id: selectedRows, status: status })
        .then((res) => {
          console.log(res, ">>>>>>>>>>>>>>>>>>134s");
          if (res.code === 200) {
            setResponseMessage(FEATURE.ADD_DELETE_MESSAGE);
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
          setResponseMessage(FEATURE.ADD_ERROR_MESSAGE);
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
            <title>{FEATURE.TITLE}</title>
          </title>
        </Head>
        {loading === false ? (
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              py: 8,
              marginTop: "1%",
            }}
          >
            <Container maxWidth="xl">
              <Stack spacing={3}>
                <Stack direction="row" justifyContent="space-between" spacing={4}>
                  <Stack spacing={1}>
                    <Typography variant="h5" sx={{ marginLeft: "10px" }}>
                      {FEATURE.TITLE}
                    </Typography>
                  </Stack>
                  <div>
                    <Link href="add-feature" style={{ textDecoration: "none" }}>
                      <Button
                        startIcon={
                          <SvgIcon fontSize="12px">
                            <PlusIcon />
                          </SvgIcon>
                        }
                        variant="contained"
                        sx={{
                          // background: "#70b42c",
                          //     color: "white",
                          //     borderRadius: "5px",
                          //     fontSize:"12px",
                          //     padding:"5px",
                          //     px:"10px",
                          //     marginRight:"20px",
                          //     "&:hover": {
                          //       background: "#70b42c",
                          //     },
                          backgroundColor: success.primary,
                          "&:hover": {
                            backgroundColor: success.primary, // Change hover color
                          },
                          "&:active": {
                            backgroundColor: success.primary, // Change active color
                          },
                        }}
                      >
                        {FEATURE.Feature_Add_Button}
                      </Button>
                    </Link>
                  </div>
                </Stack>
                <FeatureTable
                  data={data}
                  onPageChange={(pageno) => {
                    setPage(pageno);
                  }}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  onSearch={(query) => {
                    setSearchQuery(query);
                    setPage(1);
                  }}
                  selected={featuresSelection.selected}
                  statusFilter={(status) => {
                    setStatus(status);
                    setPage(1);
                  }}
                  typeFilter={(type) => {
                    setType(type);
                    setPage(1);
                  }}
                  onDelete={(data) => {
                    setDeletingfeature(data);
                    setModal(true);
                  }}
                  selectedRows={selectedRows}
                  setSelectedRows={(item) => setSelectedRows(item)}
                  multipleStatusChange={(status) => {
                    handleDeleteFeature(status);
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
                    <Button onClick={handleDeleteFeature} autoFocus>
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
