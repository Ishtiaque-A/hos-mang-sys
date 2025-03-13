import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { CANCEL_REQUEST, ORGANIZATION_PLAN } from "../../common/constantData/language";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { FeatureSearch } from "./feature-search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { format } from "date-fns";
import {
  Box,
  Card,
  Button,
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
  Checkbox,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";
import { ADMIN } from "../../common/constantData/screenUrl";

export const CancelRequestTable = (props) => {
  const { data = {}, selected = [], onSearch } = props;

  console.log(data, "dsfjk>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

  const [listAction, setListAction] = React.useState(null);
  const [statusMenu, setStatusMenu] = React.useState(null);
  const [subscriptionMenu, setSubscriptionMenu] = React.useState(null);
  const [action, setAction] = React.useState(null);
  const [activeItem, setActiveItem] = useState(0);
  ///Checkbox///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const selectedIds = data?.data.map((features) => features.id);
      props.setSelectedRows(selectedIds);
    } else {
      props.setSelectedRows([]);
    }
    setShowDeleteButton(event.target.checked);
  };

  const handleSelectOne = (event, id) => {
    if (event.target.checked) {
      props.setSelectedRows([...props.selectedRows, id]);
    } else {
      let newSelected = props.selectedRows.filter((rowId) => rowId !== id);
      props.setSelectedRows(newSelected);
    }
    setShowDeleteButton(event.target.checked);
  };

  const isRowSelected = (id) => props.selectedRows.includes(id);

  ///////Checkbox end/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////select button //////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleMenuClose = () => {
    setListAction(null);
    setActiveItem(null);
  };

  ////////////select button //////////////////////////////////////////////////////////////////////////////////////////////////////

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
  console.log(props.subscriptionData, "props.subscriptionData");
  return (
    <Card sx={{border:"1px solid #eee", borderRadius:"10px"}}>
      <Grid container spacing={2}>
        <Grid item xs={2} md={3}>
          <div style={{ width: "100%", padding: "10px" }}>
            <FeatureSearch onSearch={onSearch} />
          </div>
        </Grid>
        <Grid item xs={1} md={1.5}>
          <>
            <Button
              sx={{
                color: "#000",
                background: "#F1EEEE",
                marginLeft: "10px",
                marginTop: "15px",
                padding: "5px 10px 5px 10px",
                borderRadius: "30px",
              }}
              aria-label="more"
              aria-controls="subscription-menu"
              aria-haspopup="true"
              onClick={(event) => setStatusMenu(event.currentTarget)}
            >
              Status <ExpandMoreIcon />
            </Button>
            <Menu
              id="subscription-menu"
              anchorEl={statusMenu}
              open={statusMenu ?? false}
              onClose={() => setStatusMenu(null)}
              sx={{
                marginTop: "30px",
              }}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem
                onClick={() => {
                  props.statusFilter(null);
                  setStatusMenu(null);
                }}
                style={{ textDecoration: "none", color: "#9DA4AE", fontSize: "14px" }}
              >
                All
              </MenuItem>
              <MenuItem
                onClick={() => {
                  props.statusFilter(0);
                  setStatusMenu(null);
                }}
                style={{ textDecoration: "none", color: "#9DA4AE", fontSize: "14px" }}
              >
                Rejected
              </MenuItem>
              <MenuItem
                onClick={() => {
                  props.statusFilter(1);
                  setStatusMenu(null);
                }}
                style={{ textDecoration: "none", color: "#9DA4AE", fontSize: "14px" }}
              >
                Accepted{" "}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  props.statusFilter(2);
                  setStatusMenu(null);
                }}
                style={{ textDecoration: "none", color: "#9DA4AE", fontSize: "14px" }}
              >
                Pending{" "}
              </MenuItem>
            </Menu>
          </>
        </Grid>

        <Grid item xs={1} md={2.5}>
          <>
            <Button
              sx={{
                color: "#000",
                background: "#F1EEEE",
                marginLeft: "10px",
                marginTop: "15px",
                padding: "5px 10px 5px 10px",
                borderRadius: "30px",
                fontSize: "14px",
              }}
              aria-label="more"
              aria-controls="subscription-menu"
              aria-haspopup="true"
              onClick={(event) => setAction(event.currentTarget)}
            >
              Subscription plan <ExpandMoreIcon />
            </Button>
            <Menu
              id="subscription-menu"
              anchorEl={action}
              open={action ?? false}
              onClose={() => setAction(null)}
              sx={{
                marginTop: "30px",
              }}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              {props.subscriptionData?.map((data) => (
                <MenuItem
                  key={data.id}
                  onClick={() => {
                    props.setSubscription_plan(data.id);
                    setSubscriptionMenu(null);
                  }}
                  style={{ textDecoration: "none", color: "#9DA4AE", fontSize: "14px" }}
                >
                  {data.name}{" "}
                </MenuItem>
              ))}
              
            </Menu>
          </>
        </Grid>

        <Grid item xs={8} md={5}>
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
                <StyledTableCell>{CANCEL_REQUEST.NAME}</StyledTableCell>
                <StyledTableCell>{CANCEL_REQUEST.SUBSCRIPTION_PLAN}</StyledTableCell>
                <StyledTableCell>{CANCEL_REQUEST.START_DATE}</StyledTableCell>
                <StyledTableCell>{CANCEL_REQUEST.END_DATE}</StyledTableCell>
                <StyledTableCell>{CANCEL_REQUEST.PRICE}</StyledTableCell>
                <StyledTableCell>{CANCEL_REQUEST.STATUS}</StyledTableCell>
                <StyledTableCell>{CANCEL_REQUEST.ACTION}</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {data?.data?.map((table_data, index) => {
                const isSelected = isRowSelected(table_data.id);
                const actualIndex = index + data?.from ?? 0;
                const startDate = table_data?.purchase?.subscription_detail?.start_date
                  ? format(
                      new Date(table_data.purchase.subscription_detail.start_date),
                      "MMMM dd, yyyy"
                    )
                  : "N/A";
                const endDate = table_data?.purchase?.subscription_detail?.end_date
                  ? format(
                      new Date(table_data.purchase.subscription_detail.end_date),
                      "MMMM dd, yyyy"
                    )
                  : "N/A";
                return (
                  <TableRow hover key={table_data.id}>
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
                        <Typography variant="caption">
                          {table_data?.purchase?.organization?.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption">
                        {table_data?.purchase?.subscription_plan?.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" sx={{ color: "#9DA4AE" }}>
                        {startDate}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" sx={{ color: "#9DA4AE" }}>
                        {endDate}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="caption" sx={{ color: "#9DA4AE" }}>
                        {table_data?.purchase?.sell_price ? table_data?.purchase?.sell_price : 0}
                        {" "}{props.currency}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" sx={{ color: "#9DA4AE" }}>
                        {table_data?.status === "0" ? (
                          <>Rejected</>
                        ) : table_data?.status === "1" ? (
                          <>Accepted</>
                        ) : (
                          <>Pending</>
                        )}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="more"
                        aria-controls="subscription-menu"
                        aria-haspopup="true"
                        onClick={(event) => {
                          setListAction(event.currentTarget);
                          setActiveItem(table_data);
                        }}
                      >
                        <MoreHorizIcon />
                      </IconButton>
                      <Menu
                        id="subscription-menu"
                        anchorEl={listAction}
                        open={listAction ?? false}
                        onClose={handleMenuClose}
                        sx={{
                          marginTop: "30px",
                        }}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                      >
                        <MenuItem onClick={handleMenuClose}>
                          <Link
                            href={`cancel-request/${activeItem?.id}`}
                            style={{ textDecoration: "none", color: "#9DA4AE", fontSize: "14px" }}
                          >
                            {ORGANIZATION_PLAN.DETAILS}{" "}
                            <ModeEditIcon sx={{ fontSize: "14px", marginLeft: "35px" }} />
                          </Link>
                        </MenuItem>
                      </Menu>
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

CancelRequestTable.propTypes = {
  count: PropTypes.number,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
  onSearch: PropTypes.func,
  onDelete: PropTypes.func,
};
