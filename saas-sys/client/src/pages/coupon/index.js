import { useCallback, useMemo, useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { cuponDeleteMultipleApiCall, fetchCouponAPIGet } from "../../common/apiCall/api";
import { COUPON } from "../../common/constantData/language";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import { useRouter } from "next/router";
import CouponTable from "../../sections/coupon/cupon-table";
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
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const coupons = useFeatures(page, rowsPerPage);
  const couponsIds = useFeatureIds(coupons);
  const couponsSelection = useSelection(couponsIds);
  const [modal, setModal] = React.useState(false);
  const [deletingCouponId, setDeletingCouponId] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const fetchData = async (status = 2) => {
    try {
      const response = await fetchCouponAPIGet(status);
      const data = response?.data?.coupons;
      setData(data);
      setFilteredData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    // Perform search whenever searchQuery changes
    const performSearch = () => {
      const filteredData = data.filter((coupon) =>
        coupon.code.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filteredData);
    };

    performSearch();
  }, [searchQuery]);

  function useFeatures(page, rowsPerPage) {
    return useMemo(() => {
      const startIndex = page * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;
      return filteredData.slice(startIndex, endIndex);
    }, [filteredData, page, rowsPerPage]);
  }

  function useFeatureIds(coupons) {
    return useMemo(() => {
      return coupons.map((coupon) => coupon.id);
    }, [coupons]);
  }

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(0); // Reset page to 0 when search query changes
  };

  const handleClose = () => {
    setModal(false);
    setDeletingCouponId(null);
  };

  const handleDeleteCupon = (id, status) => {
    cuponDeleteMultipleApiCall({ id: id, status: status })
      .then((res) => {
        if (res.code === 200) {
          setResponseMessage(COUPON.ADD_DELETE_MESSAGE);
          setOpenAlert1(true);
          setTimeout(() => {
            //router.reload();
            fetchData();
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
      .catch((error) => {
        setResponseMessage(COUPON.ADD_ERROR_MESSAGE);
        setOpenAlert2(true);
      })
      .finally(() => {
        handleClose();
        // router.reload();
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

  return (
    <>
      <Box sx={{ backgroundColor: "white", mx: "10px", my: "20px", borderRadius: "30px" }}>
        <Head>
          <title>
            <title>{COUPON.TITLE}</title>
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
                      {COUPON.TITLE}
                    </Typography>
                  </Stack>
                  <div>
                    <Link href="coupon/add" style={{ textDecoration: "none" }}>
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
                          // fontSize:"12px",
                          // padding:"10px",
                          // px:"10px",
                          // marginRight:"20px",
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
                        {COUPON.COUPON_Add_Button}
                      </Button>
                    </Link>
                  </div>
                </Stack>
                <CouponTable
                  count={data.length}
                  items={coupons}
                  onDeselectAll={couponsSelection.handleDeselectAll}
                  onDeselectOne={couponsSelection.handleDeselectOne}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  onSelectAll={couponsSelection.handleSelectAll}
                  onSelectOne={couponsSelection.handleSelectOne}
                  page={page}
                  onSearch={handleSearch}
                  rowsPerPage={rowsPerPage}
                  selected={couponsSelection.selected}
                  onDelete={(id, status) => {
                    handleDeleteCupon(id, status);
                  }}
                  onFilter={(status) => {
                    fetchData(status);
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
                    <Button onClick={handleDeleteCupon} autoFocus>
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
