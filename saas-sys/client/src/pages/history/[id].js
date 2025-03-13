
import { useCallback, useMemo, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { Box, Button, Container, Divider, Card, Typography, Stack, Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { COUPON_DETAILS ,HISTORY} from "../../common/constantData/language";
import { fetchHistoryDetailsAPIGet } from "../../common/apiCall/api";
import { ADMIN } from "../../common/constantData/screenUrl";
import Loading from "src/components/Loading";
import { format } from 'date-fns';
import { connect } from "react-redux";
import getGlobalState from "../../stateManagement/global/globalSelector";

const mapStateToProps = (state) => ({
  currency: getGlobalState(state)?.currency,
});

const Page = (props) => {
  const router = useRouter();
  const { id } = router.query;
  const [details, setDetails] = useState([]);
  const [loading,setLoading] = useState(true);




  useEffect(() => {
    fetchHistoryDetailsAPIGet(id)
        .then((response=>{
          setDetails(response?.data?.payment);
        setLoading(false)
        })).catch(err=>{
          console.log(err)
        })

  }, []);
  console.log(details,"details")
  return (
    <>
      <Head>
        <title>{HISTORY.DETAILS} </title>
      </Head>
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
                <Typography variant="h5" sx={{ padding: "8px", marginLeft: "" }}>
                {HISTORY.DETAILS}
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
            {loading === false?(
              <Box sx={{ flexGrow: 1, width: "80%", margin: "0 auto", marginTop: "2rem" }}>
              <Grid container spacing={2} sx={{ color: "#545353" }}>
                <Grid xs={3} sx={{ fontWeight: "bold" }}>
                  {HISTORY.Subscription} :
                </Grid>
                <Grid xs={8}>
                  {details.purchase.subscription_plan.name}
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ color: "#545353" ,marginTop:"20px"}}>
                <Grid xs={3} sx={{ marginBottom: "20px", fontWeight: "bold" }}>
                  {HISTORY.USER_LIMIT} :
                </Grid>
                <Grid xs={8} sx={{ marginBottom: "20px" }}>
                  {details?. purchase?.subscription_plan.user_limit}
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ color: "#545353" ,marginTop:"20px"}}>
                <Grid xs={3} sx={{ marginBottom: "20px", fontWeight: "bold" }}>
                  {HISTORY.ACTUAL_PRICE} :
                </Grid>
                <Grid xs={8} sx={{ marginBottom: "20px" }}>
                {details?.purchase?.subscription_plan?.price} {" "}{props.currency}
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ color: "#545353" ,marginTop:"20px"}}>
                <Grid xs={3} sx={{ marginBottom: "20px", fontWeight: "bold" }}>
                  {HISTORY.SELL_PRICE} :
                </Grid>
                <Grid xs={8} sx={{ marginBottom: "20px" }}>
                  {details?.purchase?.sell_price} {" "}{props.currency}
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ color: "#545353" ,marginTop:"20px"}}>
                <Grid xs={3} sx={{ marginBottom: "20px", fontWeight: "bold" }}>
                  {HISTORY.AMOUNT} :
                </Grid>
                <Grid xs={8} sx={{ marginBottom: "20px" }}>
                  {details?.amount} {" "}{props.currency}
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ color: "#545353" ,marginTop:"20px"}}>
                <Grid xs={3} sx={{ marginBottom: "20px", fontWeight: "bold" }}>
                {HISTORY.STATUS} :
                </Grid>
                <Grid xs={8} sx={{ marginBottom: "20px" }}>
                  {details?.status == 0 ?' Failed':details?.status == 1 ? 'success':'pending'}
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ color: "#545353" ,marginTop:"20px"}}>
                <Grid xs={3} sx={{ marginBottom: "20px", fontWeight: "bold" }}>
                  {HISTORY.COMMENT} :
                </Grid>
                <Grid xs={8} sx={{ marginBottom: "20px" }}>
                {details?.comment}
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ color: "#545353" ,marginTop:"20px"}}>
                <Grid xs={3} sx={{ marginBottom: "20px", fontWeight: "bold" }}>
                  {HISTORY.DATE} :
                </Grid>
                <Grid xs={8} sx={{ marginBottom: "20px" }}>
                {details.created_at ? format(new Date(details.created_at), 'dd/MM/yyyy') : 'N/A'}
                </Grid>
              </Grid>
              
              <Grid item xs={6}>
                <div style={{ width: "100%" }}>
                  <Link href={ADMIN.HISTORY_URL}>
                    <Button
                      // loading={loading}
                      variant="contained"
                      sx={{
                        background: "white",
                        padding: "3px",
                        color: "#4287DA",
                        mt: 2,
                        ml:-3,
                        float: "",
                        "&:hover": {
                          background: "#10741C",
                          color:"white",
                        },
                      }}
                    >
                      BACK
                    </Button>
                  </Link>
                </div>
              </Grid>
            </Box>
            ):(<Loading />)}

          </Card>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default connect(mapStateToProps)(Page);
