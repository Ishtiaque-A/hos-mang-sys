import { useState, useEffect,useCallback } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import {
  Box,
  Button,
  Container,
  Card,
  Typography,
  Stack,
  Grid,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OrganizationPlanDetails1Table } from "../../../sections/organizationplan/organization-plan-details1-table.js";
import { OrganizationPlanDetails2Table } from "../../../sections/organizationplan/organization-plan-details2-table.js";
import { organizationplanADetailsPIGet } from "../../../common/apiCall/api";
import { AUDIT,ORGANIZATION_PLAN } from "../../../common/constantData/language";
import { ADMIN } from "../../../common/constantData/screenUrl";
import Loading from "src/components/Loading";
import getGlobalState from "../../../stateManagement/global/globalSelector";
import { connect } from "react-redux";
import { format } from "date-fns";

const mapStateToProps = (state) => ({
  currency: getGlobalState(state)?.currency,
});


const Page = (props) => {
  const router = useRouter();
  const { id } = router.query;
  const [details, setDetails] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedRows, setSelectedRows] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [old, setOld] = useState([]);
  const [mergedData, setMergedData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await organizationplanADetailsPIGet(id);
        console.log(data.data,"data>>>")
         setDetails(data.data);

         setLoading(false);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [loading]);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
    setPage(1);
  }, []);

  const startDate = details?.created_at
                ? format(new Date(details?.created_at), "MMMM dd, yyyy")
                : "N/A";

  return (
    <>
      <Head>
        <title>{AUDIT.DETAILS_TITLE} </title>
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
                  {AUDIT.DETAILS_TITLE}
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
        
          <Card>
            {loading === false ? (
              <>
                <Box sx={{ flexGrow: 1, width: "80%", margin: "0 auto", marginTop: "2rem" }}>
                  <Grid container spacing={2} sx={{ color: "#545353", margin: "20px" }}>
                    <Grid xs={3} sx={{ fontWeight: "bold" }}>
                      {ORGANIZATION_PLAN.NAME} :
                    </Grid>
                    <Grid xs={8}>{details?.name}</Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ color: "#545353", margin: "20px" }}>
                    <Grid xs={3} sx={{ fontWeight: "bold" }}>
                      {ORGANIZATION_PLAN.USER_MOBILE} :
                    </Grid>
                    <Grid xs={8}>{details?.mobile}</Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ color: "#545353", margin: "20px" }}>
                    <Grid xs={3} sx={{ fontWeight: "bold" }}>
                      {ORGANIZATION_PLAN.EMAIL} :
                    </Grid>
                    <Grid xs={8}>{details?.email}</Grid>
                  </Grid>
                  
                  <Grid container spacing={2} sx={{ color: "#545353", margin: "20px" }}>
                    <Grid xs={3} sx={{ fontWeight: "bold" }}>
                      {AUDIT.CREATED_AT} :
                    </Grid>
                    <Grid xs={8}>{startDate}</Grid>
                  </Grid>

                  {details?.properties ? (
                    <>
                      {details?.properties?.attributes ? (
                        <Card>
                          {attributes !== undefined ? (
                            <Box
                              sx={{
                                flexGrow: 1,
                                width: "80%",
                                margin: "0 auto",
                                marginTop: "2rem",
                              }}
                            >
                              <TableContainer>
                                <Table>
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>{AUDIT.KEY}</TableCell>
                                      <TableCell>{AUDIT.NEW_VALUE}</TableCell>
                                      {details?.properties?.old && (
                                          <TableCell>{AUDIT.Old_VALUE}</TableCell>
                                        )}
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {Object.entries(attributes).map(([key, value]) => (
                                      <TableRow key={key}>
                                        <TableCell>{key}</TableCell>
                                        <TableCell>
                                          {typeof value === "object"
                                            ? JSON.stringify(value)
                                            : value}
                                        </TableCell>
                                        {details?.properties?.old && (
                                          <TableCell>
                                            {old.hasOwnProperty(key)
                                              ? typeof old[key] === "object"
                                                ? JSON.stringify(old[key])
                                                : old[key]
                                              : "N/A"}
                                          </TableCell>
                                        )}
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </TableContainer>

                              {/* ... (other components) */}
                            </Box>
                          ) : (
                            <Loading />
                          )}
                        </Card>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                  <Grid item xs={6}>
                    <div style={{ width: "100%", paddingBottom: "10px" }}>
                      <Link href={ADMIN.AUDIT_LIST_URL}>
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
                
              </>
            ) : (
              <Loading />
            )}
          </Card>
       
      </Box>
      <div style={{marginTop:"4%"}}></div>
      <OrganizationPlanDetails1Table
                data={details?.subscription_details}
                currency={props.currency}
                onPageChange={(pageno) => {
                  setPage(pageno);
                }}
                onRowsPerPageChange={handleRowsPerPageChange}
                selectedRows={selectedRows}
                setSelectedRows={(item) => setSelectedRows(item)}
              />
               <div style={{marginTop:"4%"}}></div>
      <OrganizationPlanDetails2Table
                data={details?.users}
                onPageChange={(pageno) => {
                  setPage(pageno);
                }}
                onRowsPerPageChange={handleRowsPerPageChange}
                selectedRows={selectedRows}
                setSelectedRows={(item) => setSelectedRows(item)}
              />
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default connect(mapStateToProps)(Page);
