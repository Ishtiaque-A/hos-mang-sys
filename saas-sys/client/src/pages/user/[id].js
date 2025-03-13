import {  useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { Box, Button, Container, Divider, Card, Typography,Stack ,Grid  } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { userDetailsAPIGet } from '../../common/apiCall/api';
import {  EDIT, USER } from "../../common/constantData/language";
import {  ADMIN } from "../../common/constantData/screenUrl";
import Loading from "src/components/Loading";
import Image from 'next/image'


const Page = () => {
  const router = useRouter();
  const { id } = router.query;
  const [details, setDetails] = useState([]);
  const [loading,setLoading] = useState(true);

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await userDetailsAPIGet(id);
        setDetails(data?.data?.user);
        setLoading(false)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const [selectedOption, setSelectedOption] = useState("");
  const userType =[
    {
      "id" : "0",
      "name" : "Super Admin"
    },
    {
      "id" : "1",
      "name" : "Super User"
    },
    {
      "id" : "2",
      "name" : "Organization Admin"
    },
    {
      "id" : "3",
      "name" : "Organization User"
    },
    {
      "id" : "4",
      "name" : "General User"
    },
  ]

  const filteredUserData = userType.filter(item => item.id === details?.user_type);
  const defaultFeatureData = filteredUserData[0];

  useEffect(() => {
    const fetchData = async () => {
      setSelectedOption(defaultFeatureData);
    };
    fetchData();
  }, [details]);

  console.log(details.photo)

  return (
    <>
      <Head>
        <title>{USER.EDIT_USER_TITLE} </title>
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
                {USER.EDIT_USER_TITLE}
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
          {loading === false ?(<>
            <Box sx={{ flexGrow: 1 ,width:"80%",margin:"0 auto",marginTop:"2rem"}}>
              {details?.photo !== null && (
                <Grid container spacing={2} sx={{ color: "#545353",margin:"20px" }}>
                <Grid xs={12} >
                <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden' }}>
                <Image
                    src={details?.photo}
                    width={100}
                    height={100}
                    alt="Picture of the author"
                    sx={{}}
                  />
                </div>
                </Grid>
              </Grid>
              )}
            
              <Grid container spacing={2} sx={{ color: "#545353",margin:"20px" }}>
                <Grid xs={3} sx={{ fontWeight: "bold" }}>
                {USER.NAME} :
                </Grid>
                <Grid xs={8}>
                {details.name}
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ color: "#545353",margin:"20px" }}>
                <Grid xs={3} sx={{ fontWeight: "bold" }}>
                {USER.EMAIL} :
                </Grid>
                <Grid xs={8}>
                  {details.email}
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ color: "#545353" ,margin:"20px"}}>
                <Grid xs={3} sx={{ fontWeight: "bold" }}>
                {USER.PHONE} :
                </Grid>
                <Grid xs={8}>
                  {details.mobile}
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ color: "#545353" ,margin:"20px"}}>
                <Grid xs={3} sx={{ fontWeight: "bold" }}>
                {USER.USER_TYPE} :
                </Grid>
                <Grid xs={8}>
                  {selectedOption?.name}
                </Grid>
              </Grid>
              
              <Link href={`${ADMIN.USER_EDIT_URL}/${details.id}`}>
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
                  <Link href={ADMIN.USER_REQUEST}>
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
          </>):(<Loading />)}
          
          </Card>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
