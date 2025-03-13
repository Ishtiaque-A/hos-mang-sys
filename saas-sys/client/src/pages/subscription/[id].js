import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { Box, Button, Container, Divider, Card, Typography, Stack, Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { fetchSubscriptionDetailsAPIGet } from "../../common/apiCall/api";
import { EDIT, SUBSCRIPTION_DETAILS } from "../../common/constantData/language";
import { ADMIN } from "../../common/constantData/screenUrl";
import getGlobalState from "../../stateManagement/global/globalSelector";
import { connect } from "react-redux";
import Loading from "src/components/Loading";

const mapStateToProps = (state) => ({
  currency: getGlobalState(state)?.currency,
});

const mapDispatchToProps = (dispatch) => ({});

const Page = (props) => {
  const router = useRouter();
  const { id } = router.query;
  const [details, setDetails] = useState([]);
  const [loading,setLoading] = useState(true);


  useEffect(() => {
    fetchSubscriptionDetailsAPIGet(id)
    .then((response)=>{
      if (response?.code==200){
        setDetails(response?.data?.subscription_plan);
        setLoading(false)
      }
    }).catch (()=> {
      setResponseMessage('Unable to fetch data');
    })
  }, []);
  return (
    <>
      <Head>
        <title>{SUBSCRIPTION_DETAILS.TITLE} </title>
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
                  {SUBSCRIPTION_DETAILS.TITLE}
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
            <Box sx={{ flexGrow: 1, width: "80%", margin: "0 auto", marginTop: "4rem" }}>
              {loading === false ?(
                <>
                <Grid container spacing={2} sx={{ color: "#545353" }}>
                <Grid xs={3} sx={{ fontWeight: "bold" }}>
                  {SUBSCRIPTION_DETAILS?.MAME} :
                </Grid>
                <Grid xs={8}>{details.name}</Grid>
              </Grid>
              <Grid container spacing={2} sx={{ color: "#545353", marginTop: "20px" }}>
                <Grid xs={3} sx={{ fontWeight: "bold" }}>
                  {SUBSCRIPTION_DETAILS?.DURATION} :
                </Grid>
                <Grid xs={8} >
                  {/* {durationHelper(details?.duration)} */}
                  {details?.validity?.name}
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ color: "#545353", marginTop: "20px" }}>
                <Grid xs={3} sx={{  fontWeight: "bold" }}>
                  {SUBSCRIPTION_DETAILS?.PRICE} :
                </Grid>
                <Grid xs={8} >
                  {details?.price != 0 ? details.price + props.currency : "FREE"}
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ color: "#545353", marginTop: "20px" }}>
                <Grid xs={3} sx={{  fontWeight: "bold" }}>
                  {SUBSCRIPTION_DETAILS?.STORAGE} :
                </Grid>
                <Grid xs={8} >
                  {/* {storageHelper(details?.storage_limit?.name)} */}
                  {details?.storage_limit?.name}
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ color: "#545353", marginTop: "20px" }}>
                <Grid xs={3} sx={{  fontWeight: "bold" }}>
                  {SUBSCRIPTION_DETAILS?.USER_LIMIT} :
                </Grid>
                <Grid xs={8} >
                  {details?.user_limit} {details?.user_limit == 1 ? "User" : "Users"}
                </Grid>
              </Grid>
                  <Grid container spacing={2} sx={{ color: "#545353", marginTop: "20px" }}>
                    <Grid xs={3} sx={{  fontWeight: "bold" }}>
                      {SUBSCRIPTION_DETAILS?.FEATURES} :
                    </Grid>

                    <Grid xs={8} >
                      {details?.features.map((item) => {return <Grid xs={12} >{item?.name}</Grid>})}
                    </Grid>
                  </Grid>
              <Grid container spacing={2} sx={{ color: "#545353", marginTop: "20px" }}>
                <Grid xs={3} sx={{ fontWeight: "bold" }}>
                  {SUBSCRIPTION_DETAILS?.DETAILS} :
                </Grid>
                <Grid xs={8} sx={{ marginBottom: "20px" }}>
                  {details?.details}
                </Grid>
              </Grid>

              <Link href={`${ADMIN.SUBSCRIPTION_EDIT_URL}/${details.id}`}>
                <Button
                  variant="contained"
                  sx={{
                    background: "#089B1A",
                    color: "white",
                    border: "",
                    marginTop: "1rem",
                    float: "right",
                    marginBottom: "1rem",
                    padding: "3px",
                    "&:hover": {
                      background: "#10741C",
                    },
                  }}
                >
                  {EDIT}
                </Button>
              </Link>
              <Grid item xs={6}>
                <div style={{ width: "100%" }}>
                  <Link href={ADMIN.SUBSCRIPTION_PLAN_LIST}>
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
              </>
              ):( <Loading/>)}
              
            </Box>
          </Card>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// export default Page;
export default connect(mapStateToProps, mapDispatchToProps)(Page);
