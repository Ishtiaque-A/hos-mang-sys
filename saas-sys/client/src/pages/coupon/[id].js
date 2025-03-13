import { useCallback, useMemo, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { Box, Button, Container, Divider, Card, Typography, Stack, Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { COUPON_DETAILS } from "../../common/constantData/language";
import { fetchCouponDetailsAPIGet } from "../../common/apiCall/api";
import { ADMIN } from "../../common/constantData/screenUrl";
import Loading from "src/components/Loading";

const Page = () => {
  const router = useRouter();
  const { id } = router.query;
  const [details, setDetails] = useState([]);
  const [loading,setLoading] = useState(true);




  useEffect(() => {
        fetchCouponDetailsAPIGet(id)
        .then((response=>{
          setDetails(response?.data?.coupon);
        setLoading(false)
        })).catch(err=>{
          console.log(err)
        })

  }, []);
  console.log(details,"details")
  return (
    <>
      <Head>
        <title>{COUPON_DETAILS.MAME} </title>
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
                {COUPON_DETAILS.DETAILS}
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
                  {COUPON_DETAILS.CODE} :
                </Grid>
                <Grid xs={8}>
                  {details.code}
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ color: "#545353" ,marginTop:"20px"}}>
                <Grid xs={3} sx={{ marginBottom: "20px", fontWeight: "bold" }}>
                  {COUPON_DETAILS.AMOUNT} :
                </Grid>
                <Grid xs={8} sx={{ marginBottom: "20px" }}>
                  {details?.amount}
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ color: "#545353" ,marginTop:"20px"}}>
                <Grid xs={3} sx={{ marginBottom: "20px", fontWeight: "bold" }}>
                  {COUPON_DETAILS.DISCOUNT_TYPE} :
                </Grid>
                <Grid xs={8} sx={{ marginBottom: "20px" }}>
                {details?.discount_type == "0"?(<>Flat</>):(<>Percentage</>)}
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ color: "#545353" ,marginTop:"20px"}}>
                <Grid xs={3} sx={{ marginBottom: "20px", fontWeight: "bold" }}>
                  {COUPON_DETAILS.START_DATE} :
                </Grid>
                <Grid xs={8} sx={{ marginBottom: "20px" }}>
                  {details?.start_date}
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ color: "#545353" ,marginTop:"20px"}}>
                <Grid xs={3} sx={{ marginBottom: "20px", fontWeight: "bold" }}>
                  {COUPON_DETAILS.EXPIRE_DATE} :
                </Grid>
                <Grid xs={8} sx={{ marginBottom: "20px" }}>
                  {details?.end_date}
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ color: "#545353" ,marginTop:"20px"}}>
                <Grid xs={3} sx={{ marginBottom: "20px", fontWeight: "bold" }}>
                  Status :
                </Grid>
                <Grid xs={8} sx={{ marginBottom: "20px" }}>
                  {details?.status == 1 ?' Active': 'Inactive'}
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ color: "#545353" ,marginTop:"20px"}}>
                <Grid xs={3} sx={{ marginBottom: "20px", fontWeight: "bold" }}>
                  {COUPON_DETAILS.USER_TYPE} :
                </Grid>
                <Grid xs={8} sx={{ marginBottom: "20px" }}>
                {details?.user_type == "1"?(<>{details?.users?.map((item)=><li key={item.id}>{item.name}</li>)}</>):(<>All</>)}
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ color: "#545353" ,marginTop:"20px"}}>
                <Grid xs={3} sx={{ marginBottom: "20px", fontWeight: "bold" }}>
                  {COUPON_DETAILS.SUBSCRIPTION_PLAN_TYPE} :
                </Grid>
                <Grid xs={8} sx={{ marginBottom: "20px" }}>
                {details?.subscription_plan_type == "1"?(<>{details?.subscription_plans?.map((item)=><li key={item.id}>{item.name}</li>)}</>):(<>All</>)}
                </Grid>
              </Grid>
              <Link href={`${ADMIN.COUPON_PLAN_EDIT}/${details.id}`}>
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
                  {COUPON_DETAILS.EDIT}
                </Button>
              </Link>
              <Grid item xs={6}>
                <div style={{ width: "100%" }}>
                  <Link href={ADMIN.COUPON_PLAN_LIST}>
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

export default Page;
