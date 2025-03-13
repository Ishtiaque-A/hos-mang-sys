import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { USER, AUDIT,SUBSCRIPTIONPLAN } from "../../common/constantData/language";
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
  Typography,
  Grid,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";

export const SubscriptionPlanTable = (props) => {
  const { data = {} } = props;
  const [listAction, setListAction] = React.useState(null);
  const [activeItem, setActiveItem] = useState(0);
  const [showDeleteButton, setShowDeleteButton] = useState(false);

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
      alignItems:"center"
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  console.log(data,"ewefsf")

  return (
    <Card sx={{border:"1px solid #eee", borderRadius:"10px"}}>
      <Grid container spacing={2}>
        <Grid item xs={2} md={3}></Grid>
        <Grid item xs={1} md={1.5}></Grid>
        {showDeleteButton ? <Grid item xs={1} md={1.5}></Grid> : <Grid item xs={1} md={1.5}></Grid>}
        <Grid item xs={8} md={6}>
          <TablePagination
            component="div"
            count={data?.total ?? 0}
            onPageChange={(event, data) => {
              props.onPageChange(data + 1);
            }}
            onRowsPerPageChange={props.onRowsPerPageChange}
            page={data?.current_page ? data?.current_page - 1 : 0}
            rowsPerPage={data?.per_page ?? 0}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Grid>
      </Grid>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <StyledTableRow
                style={{ backgroundColor: "#f2f2f2", borderBottom: "1px solid #F1F1F1" }}
              >
                <StyledTableCell>SL</StyledTableCell>
                <StyledTableCell>{SUBSCRIPTIONPLAN.NAME}</StyledTableCell>
                <StyledTableCell>{SUBSCRIPTIONPLAN.PRICE}</StyledTableCell>
                <StyledTableCell sx={{textAlign:"center"}}>{SUBSCRIPTIONPLAN.RIQUEST_COUNT}</StyledTableCell>
                <StyledTableCell sx={{textAlign:"center"}}>{SUBSCRIPTIONPLAN.ACCEPT_COUNT}</StyledTableCell>
                <StyledTableCell sx={{textAlign:"center"}}>{SUBSCRIPTIONPLAN.REJECT_COUNT}</StyledTableCell>
                <StyledTableCell sx={{textAlign:"center"}}>{SUBSCRIPTIONPLAN.PURCHASES_COUNT}</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {data?.data?.map((subscription_plan, index) => {
                const isSelected = isRowSelected(subscription_plan.id);
                const actualIndex = index + data?.from ?? 0;
                return (
                  <TableRow hover key={subscription_plan.id}>
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
                        <Typography variant="caption">{subscription_plan?.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption"> {subscription_plan?.price}{" "}{props.currency}</Typography>
                    </TableCell>
                    <TableCell sx={{textAlign:"center"}}>
                      <Typography variant="caption" sx={{ color: "#9DA4AE"}}>
                        {subscription_plan?.request_count}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{textAlign:"center"}}>
                      <Typography variant="caption" sx={{ color: "#9DA4AE" }}>
                        {subscription_plan?.reject_count}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{textAlign:"center"}}>
                      <Typography variant="caption" sx={{ color: "#9DA4AE" }}>
                        {subscription_plan?.accept_count}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{textAlign:"center"}}>
                      <Typography variant="caption" sx={{ color: "#9DA4AE" }}>
                        {subscription_plan?.purchases_count}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
    </Card>
  );
};

SubscriptionPlanTable.propTypes = {
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
