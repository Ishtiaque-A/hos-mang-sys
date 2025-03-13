import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { Box, Button, Container, Divider, Card, Typography, Stack, Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { organizationDetailsAPIGet } from "../../common/apiCall/api";
import { EDIT, ORGANIZATION } from "../../common/constantData/language";
import { ADMIN } from "../../common/constantData/screenUrl";
import Loading from "src/components/Loading";

const Page = () => {
  const router = useRouter();
  const { id } = router.query;
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await organizationDetailsAPIGet(id);
        setDetails(data?.data?.organization);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>{ORGANIZATION.EDIT_USER_TITLE} </title>
      </Head>
      {loading === false ? (
        <>
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
                      {ORGANIZATION.EDIT_USER_TITLE}
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
              py: 8,
            }}
          >
            <Container maxWidth="xl">
              <Card>
                <Box sx={{ flexGrow: 1, width: "80%", margin: "0 auto", marginTop: "2rem" }}>
                  <Grid container spacing={2} sx={{ color: "#545353", marginBottom: "30px" }}>
                    <Grid xs={5} sx={{ fontWeight: "bold" }}>
                      {ORGANIZATION.NAME} :
                    </Grid>
                    <Grid xs={7}>{details.name}</Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ color: "#545353", marginBottom: "30px" }}>
                    <Grid xs={5} sx={{ fontWeight: "bold" }}>
                      {ORGANIZATION.EMAIL} :
                    </Grid>
                    <Grid xs={7}>{details.email}</Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ color: "#545353", marginBottom: "30px" }}>
                    <Grid xs={5} sx={{ fontWeight: "bold" }}>
                      {ORGANIZATION.CODE} :
                    </Grid>
                    <Grid xs={7}>{details.code}</Grid>
                  </Grid>

                  <Grid container spacing={2} sx={{ color: "#545353", marginBottom: "30px" }}>
                    <Grid xs={5} sx={{ fontWeight: "bold" }}>
                      {ORGANIZATION.ADDRESS} :
                    </Grid>
                    <Grid xs={7}>{details?.address}</Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ color: "#545353", marginBottom: "30px" }}>
                    <Grid xs={5} sx={{ fontWeight: "bold" }}>
                      {ORGANIZATION.PHONE} :
                    </Grid>
                    <Grid xs={7}>{details.mobile}</Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ color: "#545353", marginBottom: "30px" }}>
                    <Grid xs={5} sx={{ fontWeight: "bold" }}>
                      {ORGANIZATION.DB_NAME} :
                    </Grid>
                    <Grid xs={7}>{details?.db_name}</Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ color: "#545353", marginBottom: "30px" }}>
                    <Grid xs={5} sx={{ fontWeight: "bold" }}>
                      {ORGANIZATION.CONTACT_PERSON_NAME} :
                    </Grid>
                    <Grid xs={7}>{details.contact_person_name}</Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ color: "#545353", marginBottom: "30px" }}>
                    <Grid xs={5} sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
                      {ORGANIZATION.CONTACT_PERSON_PHONE} :
                    </Grid>
                    <Grid xs={7}>{details.contact_person_mobile}</Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ color: "#545353", marginBottom: "30px" }}>
                    <Grid xs={5} sx={{ fontWeight: "bold" }}>
                      {ORGANIZATION.CONTACT_PERSON_EMAIL} :
                    </Grid>
                    <Grid xs={7}>{details.contact_person_email}</Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ color: "#545353", marginBottom: "30px" }}>
                    <Grid xs={5} sx={{ fontWeight: "bold" }}>
                      {ORGANIZATION.CONTACT_PERSON_DESINGNATION} :
                    </Grid>
                    <Grid xs={7}>{details.contact_person_designation}</Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ color: "#545353", marginBottom: "30px" }}>
                    <Grid xs={5} sx={{ fontWeight: "bold" }}>
                      {ORGANIZATION.STATUS} :
                    </Grid>
                    <Grid xs={7}>{details.status ? "Active" : "Inactive"}</Grid>
                  </Grid>
                  {details?.special_plan && (
                    <Grid container spacing={2} sx={{ color: "#545353", marginBottom: "30px" }}>
                      <Grid xs={5} sx={{ fontWeight: "bold" }}>
                        Special Plan :
                      </Grid>
                      <Grid xs={7}>{details?.special_plan?.name}</Grid>
                    </Grid>
                  )}

                  <Link href={`${ADMIN.ORGANIZATION_EDIT_URL}/${details.id}`}>
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
                      <Link href={ADMIN.ORGANIZATION_LIST}>
                        <Button
                          // loading={loading}
                          variant="contained"
                          sx={{
                            background: "white",
                            padding: "3px",
                            color: "#4287DA",
                            mt: 2,
                            ml: -3,
                            float: "",
                            "&:hover": {
                              background: "#10741C",
                              color: "white",
                            },
                          }}
                        >
                          BACK
                        </Button>
                      </Link>
                    </div>
                  </Grid>
                </Box>
              </Card>
            </Container>
          </Box>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
