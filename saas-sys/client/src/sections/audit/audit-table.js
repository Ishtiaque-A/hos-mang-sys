import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { USER, AUDIT } from "../../common/constantData/language";
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
import { format } from "date-fns";

export const AuditTable = (props) => {
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
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

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
                <StyledTableCell>{AUDIT.USER_NAME}</StyledTableCell>
                <StyledTableCell>{AUDIT.ORGANIZATION}</StyledTableCell>
                <StyledTableCell>{AUDIT.USER_MOBILE}</StyledTableCell>
                <StyledTableCell>{AUDIT.TYPE}</StyledTableCell>
                <StyledTableCell>{AUDIT.MODEL}</StyledTableCell>
                <StyledTableCell>{AUDIT.CREATED_AT}</StyledTableCell>
                <StyledTableCell>{AUDIT.ACTION}</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {data?.data?.map((audit, index) => {
                const isSelected = isRowSelected(audit.id);
                const actualIndex = index + data?.from ?? 0;
                const createddate = audit?.created_at
                ? format(new Date(audit?.created_at), "MMMM dd, yyyy")
                : "N/A";
                return (
                  <TableRow hover key={audit.id}>
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
                        <Typography variant="caption">{audit?.user_name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption">{audit?.organization}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" sx={{ color: "#9DA4AE" }}>
                        {audit?.user_mobile}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" sx={{ color: "#9DA4AE" }}>
                        {audit?.type}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="caption" sx={{ color: "#9DA4AE" }}>
                        {audit?.model}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" sx={{ color: "#9DA4AE" }}>
                        {createddate}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <IconButton
                        aria-label="more"
                        aria-controls="subscription-menu"
                        aria-haspopup="true"
                        onClick={(event) => {
                          setListAction(event.currentTarget);
                          setActiveItem(audit);
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
                            href={`audit/${activeItem?.id}`}
                            style={{ textDecoration: "none", color: "#9DA4AE", fontSize: "14px" }}
                          >
                            {USER.DETAILS}{" "}
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

AuditTable.propTypes = {
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
