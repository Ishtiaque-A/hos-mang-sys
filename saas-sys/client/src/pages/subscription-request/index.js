import { useCallback, useMemo, useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import Loading from "src/components/Loading";
import {
  fetchSubscriptionAPIGet,
  subscriptionPlanMultipleStatusChanteApiCall,
  subscriptionRequestListAPIGet, subscriptionRequestMultipleStatusChanteApiCall
} from '../../common/apiCall/api';
import { COUPON, SUBSCRIPTION_PLAN } from '../../common/constantData/language';
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import { useRouter } from "next/router";
import { SubscriptionRequestTable } from "../../sections/subscription-request/subscription-request-table";
import { SUBSCRIPTION_PLAN_REQUEST } from "../../common/constantData/language";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Alert from '../../components/Alert';
import Alert2 from '../../components/Alert2';

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
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [status, setStatus] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modal, setModal] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [responseMessage, setResponseMessage] = useState("");
  const [openAlert1, setOpenAlert1] = useState(false);
  const [openAlert2, setOpenAlert2] = useState(false)



  const fetchData = (queryparam=null)=>{
    subscriptionRequestListAPIGet(queryparam)
      .then((response)=>{
        if (response?.code==200){
          setData(response?.data?.subscription_request);
          setLoading(false);
          setSubscriptionId(response?.data?.subscription_request?.data.map((subscription) => subscription.id));
        }
      }).catch (()=> {})
  }

  useEffect(() => {
    let query = 'perpage='+rowsPerPage
    if(searchQuery && searchQuery.length>3 ){
      query= query+'&search='+searchQuery
    }

    if([0,1,2,3].includes(status)){
      query= query+'&status='+status
    }
    if(page ){
      query= query+'&page='+page
    }

    fetchData(query);

  }, [status, refresh, searchQuery, rowsPerPage, page]);


  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
    setPage(1);
  }, []);


  const handleClose = () => {
    setModal(false);
    setSelectedRows([]);
  };

  const handleMultipleStatusChange = (status) => {
    if (selectedRows.length>0) {
      subscriptionRequestMultipleStatusChanteApiCall({ id: selectedRows, status:status })
        .then((res) => {
          if (res.code === 200) {
            setResponseMessage(SUBSCRIPTION_PLAN_REQUEST.ADD_DELETE_MESSAGE);
            setOpenAlert1(true);
            setRefresh(!refresh);
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
              setResponseMessage(res.message);
              setOpenAlert2(true);
            }
          }
        })
        .catch((error) => {
          setResponseMessage(SUBSCRIPTION_PLAN.ADD_ERROR_MESSAGE );
          setOpenAlert2(true);
        })
        .finally(() => {
          handleClose();
        });
    }
  };

  const handleAlertClose = () => {
    setResponseMessage("");
    setOpenAlert1(false);
    setOpenAlert2(false);
  };

  return (
    <>
      <Box sx={{backgroundColor:"white", mx:"10px", my:"20px", borderRadius:"30px"}}>
      <Head>
        <title>
          <title>{SUBSCRIPTION_PLAN_REQUEST.TITLE}</title>
        </title>
      </Head>
      {loading === false ? (
        <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
          marginTop:"1%",
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h5" sx={{marginLeft:"10px"}}>{SUBSCRIPTION_PLAN_REQUEST.TITLE}</Typography>
              </Stack>
            </Stack>
            <SubscriptionRequestTable
              data={data}
              onPageChange={(pageno)=> {setPage(pageno)}}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSearch={(query)=>{
                setSearchQuery(query);
                setPage(1)
              }}
              //selected={subscriptionsSelection.selected}
              statusFilter={(status) => {
                setStatus(status);
                setPage(1)
                setSelectedRows([])
              }}
              selectedStatus = {status}
              selectedRows={selectedRows}
              setSelectedRows={(item)=>setSelectedRows(item)}
              multipleStatusChange={(status)=> {handleMultipleStatusChange(status);}}
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
                {/*<Button onClick={handleDeleteFeature} autoFocus>
                  {SUBSCRIPTION_PLAN_REQUEST.AGREE}
                </Button>*/}
              </DialogActions>
            </BootstrapDialog>
            <Alert open={openAlert1} onClose={handleAlertClose} message={responseMessage} />
            <Alert2 open={openAlert2} onClose={handleAlertClose} message={responseMessage} />
          </Stack>
        </Container>
      </Box>
      ):(<Loading/>)}
      </Box>
      
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
