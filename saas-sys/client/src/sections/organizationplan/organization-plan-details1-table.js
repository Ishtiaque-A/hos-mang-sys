import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { SUBSCRIPTIONPLAN,ORGANIZATION_PLAN } from "../../common/constantData/language";
//change//
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
///////////
import {
  Box,
  Card,
  Stack,
  Table,
  TableBody,
  TableHead,
  TablePagination,
  TableRow,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Grid,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { format } from "date-fns";

export const OrganizationPlanDetails1Table = (props) => {
  const { data = [] } = props;
  const [listAction, setListAction] = React.useState(null);
  const [activeItem, setActiveItem] = useState(0);
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  console.log(activeItem,"activeItem")
  const isRowSelected = (id) => props.selectedRows.includes(id);

  const handleMenuClose = () => {
    setListAction(null);
    setActiveItem(null);
  };

  //////header style /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      fontWeight: "bold",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  console.log(data,"sdsadsd>>>>")

  

  return (
    <Card sx={{border:"1px solid #eee", borderRadius:"10px"}}>
      <Grid container spacing={2}>
        <Grid item xs={2} md={3}><h4 style={{paddingLeft:"20px"}}> Subscription plan list</h4></Grid>
        <Grid item xs={1} md={1.5}></Grid>
        {showDeleteButton ? <Grid item xs={1} md={1.5}></Grid> : <Grid item xs={1} md={1.5}></Grid>}
        <Grid item xs={8} md={6}>
          
          {/* <TablePagination
            component="div"
            count={data.length ?? 0}
            // onPageChange={(event, data) => {
            //   props.onPageChange(data + 1);
            // }}
            // onRowsPerPageChange={props.onRowsPerPageChange}
            // page={data?.current_page ? data?.current_page - 1 : 0}
            // rowsPerPage={data?.per_page ?? 5}
            // rowsPerPageOptions={[5, 10, 25]}
          /> */}
        </Grid>
      </Grid>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          {data?(
            <Table>
            <TableHead>
              <StyledTableRow
                style={{ backgroundColor: "#f2f2f2", borderBottom: "1px solid #F1F1F1" }}
              >
                <StyledTableCell>SL</StyledTableCell>
                <StyledTableCell>{ORGANIZATION_PLAN.NAME}</StyledTableCell>
                <StyledTableCell>{ORGANIZATION_PLAN.START_DATE}</StyledTableCell>
                <StyledTableCell>{ORGANIZATION_PLAN.END_DATE}</StyledTableCell>
                <StyledTableCell>{ORGANIZATION_PLAN.PRICE}</StyledTableCell>
                <StyledTableCell>{ORGANIZATION_PLAN.USER_LIMIT}</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {data?.map((organization_plan, index) => {
                const isSelected = isRowSelected(organization_plan.id);
                const actualIndex = index + 1 ?? 0;
                const startDate = organization_plan?.start_date
                ? format(new Date(organization_plan?.start_date), "MMMM dd, yyyy")
                : "N/A";
                const endDate = organization_plan?.end_date
                ? format(new Date(organization_plan?.end_date), "MMMM dd, yyyy")
                : "N/A";
                return (
                  <TableRow hover key={organization_plan.id}>
                    {/* <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        sx={{ color: "#9DA4AE" }}
                        checked={isSelected}
                        onChange={(event) => handleSelectOne(event, user.id)}
                      />
                    </TableCell> */}

                    <TableCell sx={{ color: "#9DA4AE", textDecoration: "none" }}>
                      {actualIndex}
                    </TableCell>

                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="caption">{organization_plan?.subscription_plan?.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption">{startDate}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" sx={{ color: "#9DA4AE" }}>
                        {endDate}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" sx={{ color: "#9DA4AE" }}>
                       {organization_plan?.subscription_plan?.price? organization_plan?.subscription_plan?.price :0} {props.currency}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="caption" sx={{ color: "#9DA4AE" }}>
                        {organization_plan?.subscription_plan?.user_limit}
                      </Typography>
                    </TableCell>
                    
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          ):(<>Loading...</>)}
          
        </Box>
      </Scrollbar>
    </Card>
  );
};

OrganizationPlanDetails1Table.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
