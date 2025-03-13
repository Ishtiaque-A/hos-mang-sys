import { useCallback, useMemo, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { Box, Button, Container, Divider, Card, Typography, Stack, Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { FEATURE_DETAILS } from "../../common/constantData/language";
import { fetchFeatureDetailsAPIGet } from "../../common/apiCall/api";
import { ADMIN } from "../../common/constantData/screenUrl";
import Loading from "src/components/Loading";
import Alert2 from "../../components/Alert2";

const Page = () => {
  const router = useRouter();
  const { id } = router.query;
  const [details, setDetails] = useState([]);
  const [loading,setLoading] = useState(true);
  const [responseMessage, setResponseMessage] = useState("");
  const [openAlert2, setOpenAlert2] = useState(false);




  useEffect(() => {
    fetchFeatureDetailsAPIGet(id)
      .then((response)=>{
        if (response?.code==200){
          setDetails(response?.data?.feature);
          setLoading(false)
        }
      }).catch (()=> {
        setResponseMessage('Unable to fetch data');
        setOpenAlert2(true);
      })
  }, []);

  return (
    <>
      <Head>
        <title>{FEATURE_DETAILS.TITLE} </title>
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
                {FEATURE_DETAILS.TITLE}
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
          <Card >
            {loading === false?(
              <Box sx={{ flexGrow: 1, width: "80%", margin: "0 auto", marginTop: "2rem" }}>
              <Grid container spacing={2} sx={{ color: "#545353" }}>
                <Grid xs={3} sx={{ fontWeight: "bold" }}>
                  {FEATURE_DETAILS.MAME} :
                </Grid>
                <Grid xs={8}>
                  {details.name}
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ color: "#545353" ,marginTop:"20px"}}>
                <Grid xs={3} sx={{  fontWeight: "bold" }}>
                  {FEATURE_DETAILS.PARENT} :
                </Grid>
                <Grid xs={8}>
                  {details?.parent?.name}
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ color: "#545353" ,marginTop:"20px"}}>
                <Grid xs={3} sx={{ fontWeight: "bold" }}>
                  {FEATURE_DETAILS.DETAILS} :
                </Grid>
                <Grid xs={8} >
                  {details.details}
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ color: "#545353" ,marginTop:"20px"}}>
                <Grid xs={3} sx={{ marginBottom: "20px", fontWeight: "bold" }}>
                  {FEATURE_DETAILS.STATUS} :
                </Grid>
                <Grid xs={8} sx={{ marginBottom: "20px" }}>
                  {details?.status == "1"?(<label style={{background:"#0A490E",color:"#FFFF",padding:"4px",borderRadius:"5px "}}>Active</label>) :(<label style={{background:"red",color:"#FFFF",padding:"4px",borderRadius:"5px "}}>Inactive</label>) }
                </Grid>
              </Grid>
              <Link href={`/edit-feature/${details.id}`}>
              <Button
                  variant="contained"
                  sx={{
                    background: "#089B1A",
                    color: "white",
                    border: "",
                    marginTop: "2rem",
                    float: "right",
                    marginBottom: "1rem",
                    padding: "3px",
                    "&:hover": {
                      background: "#10741C",
                    },
                  }}
                >
                  {FEATURE_DETAILS.EDIT}
                </Button>
              </Link>
              <Grid item xs={6}>
                <div style={{ width: "100%" }}>
                  <Link href={ADMIN.FEATURE_PLAN_LIST}>
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
