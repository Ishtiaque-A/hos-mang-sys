import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { USERS_PLAN,ORGANIZATION_PLAN } from "../../common/constantData/language";
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

export const UsersPlanTable = (props) => {
  const { data = {} } = props;
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
  console.log(data,"ewefsf>>>>")

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
                <StyledTableCell>{USERS_PLAN.NAME}</StyledTableCell>
                <StyledTableCell>{USERS_PLAN.EMAIL}</StyledTableCell>
                <StyledTableCell>{USERS_PLAN.STATUS}</StyledTableCell>
                <StyledTableCell>{USERS_PLAN.ORGANIZATION}</StyledTableCell>
                <StyledTableCell>{USERS_PLAN.UPDATE_OPERATION}</StyledTableCell>
                <StyledTableCell>{USERS_PLAN.CREATE_OPERATION}</StyledTableCell>
                <StyledTableCell>{USERS_PLAN.ACTION}</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {data?.data?.map((organization_plan, index) => {
                const isSelected = isRowSelected(organization_plan.id);
                const actualIndex = index + data?.from ?? 0;
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
                        <Typography variant="caption">{organization_plan?.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption">{organization_plan?.email}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" sx={{ color: "#9DA4AE" }}>
                        {organization_plan?.status === "1" ?(<>Active</>):(<>Inactive</>)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" sx={{ color: "#9DA4AE" }}>
                        {organization_plan?.organization}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="caption" sx={{ color: "#9DA4AE" }}>
                        {organization_plan?.updated_count}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" sx={{ color: "#9DA4AE" }}>
                        {organization_plan?.created_count}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="more"
                        aria-controls="subscription-menu"
                        aria-haspopup="true"
                        onClick={(event) => {
                          setListAction(event.currentTarget);
                          setActiveItem(organization_plan);
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
                            href={`organization-plan/${activeItem?.id}`}
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

UsersPlanTable.propTypes = {
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
