import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { SUBSCRIPTION_PLAN } from "../../common/constantData/language";
import { SubscriptionSearch } from "./subscription-search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

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
  Button,
  IconButton,
  Menu,
  MenuItem,
  Checkbox,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { ADMIN } from "../../common/constantData/screenUrl";
import getGlobalState from "../../stateManagement/global/globalSelector";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  currency: getGlobalState(state)?.currency,
});

const SubscriptionTable = (props) => {
  const {
    data = {},
    onSearch,
  } = props;


  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const [listAction, setListAction] = React.useState(null);
  const [statusMenu, setStatusMenu] = React.useState(null);
  const [typeMenu, setTypeMenu] = React.useState(null);
  const [action, setAction] = React.useState(null);
  const [activeItem, setActiveItem] = useState(0);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const selectedIds = data?.data.map((subscription) => subscription.id);
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
      let newSelected = props.selectedRows.filter((rowId) => rowId !== id)
      props.setSelectedRows(newSelected);
    }
    setShowDeleteButton(event.target.checked);
  };

  const isRowSelected = (id) => props.selectedRows.includes(id);

  const handleMenuClose = () => {
    setListAction(null);
    setActiveItem(null)
  };



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
    <Card sx={{border:"1px solid #eee", borderRadius:"15px" }}>
      <Grid container spacing={2}>
        <Grid item xs={2} md={3}>
          <div style={{ width: "100%", padding: "10px" }}>
            <SubscriptionSearch onSearch={onSearch} />
          </div>

        </Grid>
        <Grid item xs={1} md={1}>
          <>
            <Button
              sx={{
                color: "#000",
                background: "#F1EEEE",
                marginLeft: "10px",
                marginTop:"15px",
                padding:"5px 10px 5px 10px",
                borderRadius: "30px",
              }}
              aria-label="more"
              aria-controls="subscription-menu"
              aria-haspopup="true"
              onClick={(event)=>setStatusMenu(event.currentTarget)}
            >
              Status <ExpandMoreIcon />
            </Button>
            <Menu
              id="subscription-menu"
              anchorEl={statusMenu}
              open={statusMenu??false}
              onClose={()=>setStatusMenu(null)}
              sx={{
                marginTop:"30px"
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
                onClick={()=> {
                  props.statusFilter(null)
                  setStatusMenu(null);
                }}
                style={{ textDecoration: "none", color: "#9DA4AE", fontSize: "14px" }}
              >
                All
              </MenuItem>
              <MenuItem
                onClick={()=> {
                  props.statusFilter(1);
                  setStatusMenu(null);
                }}
                style={{ textDecoration: "none", color: "#9DA4AE", fontSize: "14px" }}
              >
                Active
              </MenuItem>
              <MenuItem
                onClick={()=> {
                  props.statusFilter(0);
                  setStatusMenu(null);
                }}
                style={{ textDecoration: "none", color: "#9DA4AE", fontSize: "14px" }}
              >
                Inactive{" "}
              </MenuItem>
            </Menu>
          </>
        </Grid>

        <Grid item xs={1} md={1}>
          <>
            <Button
              sx={{
                color: "#000",
                background: "#F1EEEE",
                marginLeft: "25px",
                marginTop:"15px",
                padding:"5px 10px 5px 10px",
                borderRadius: "30px",
              }}
              aria-label="more"
              aria-controls="subscription-menu"
              aria-haspopup="true"
              onClick={(event)=>setTypeMenu(event.currentTarget)}
            >
              Type <ExpandMoreIcon />
            </Button>
            <Menu
              id="subscription-menu"
              anchorEl={typeMenu}
              open={typeMenu??false}
              onClose={()=>setTypeMenu(null)}
              sx={{
                marginTop:"30px"
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
                onClick={()=> {
                  props.typeFilter(null)
                  setTypeMenu(null);
                }}
                style={{ textDecoration: "none", color: "#9DA4AE", fontSize: "14px" }}
              >
                All
              </MenuItem>
              <MenuItem
                onClick={()=> {
                  props.typeFilter(1);
                  setTypeMenu(null);
                }}
                style={{ textDecoration: "none", color: "#9DA4AE", fontSize: "14px" }}
              >
                Regular
              </MenuItem>
              <MenuItem
                onClick={()=> {
                  props.typeFilter(2);
                  setTypeMenu(null);
                }}
                style={{ textDecoration: "none", color: "#9DA4AE", fontSize: "14px" }}
              >
                Special{" "}
              </MenuItem>
            </Menu>
          </>
        </Grid>
        {showDeleteButton && props?.selectedRows?.length>0 ? (
          <Grid item xs={1} md={1.5}>
            <>
              <Button
                sx={{
                  color: "#000",
                  background: "#F1EEEE",
                  marginLeft: "25px",
                  marginTop:"15px",
                  padding:"5px 10px 5px 10px",
                  borderRadius: "30px",
                  fontSize: "14px",
                }}
                aria-label="more"
                aria-controls="subscription-menu"
                aria-haspopup="true"
                onClick={(event) =>setAction(event.currentTarget)}
              >
                Action <ExpandMoreIcon />
              </Button>
              <Menu
                id="subscription-menu"
                anchorEl={action}
                open={action??false}
                onClose={()=>setAction(null)}
                sx={{
                  marginTop:"30px"
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
                  onClick={() => props.multipleStatusChange(1)}
                  style={{ textDecoration: "none", color: "#9DA4AE", fontSize: "14px" }}
                >
                  Activate <DeleteIcon sx={{ fontSize: "14px", marginLeft: "35px" }} />
                </MenuItem>
                <MenuItem
                  onClick={() => props.multipleStatusChange(0)}
                  style={{ textDecoration: "none", color: "#9DA4AE", fontSize: "14px" }}
                >
                  Inactive <DeleteIcon sx={{ fontSize: "14px", marginLeft: "35px" }} />
                </MenuItem>
              </Menu>
            </>
          </Grid>
        ):(<Grid item xs={1} md={1.5}></Grid>)}
        <Grid item xs={8} md={5.5} >
          <TablePagination
            component="div"
            count={data?.total??0}
            onPageChange={(event, data) => {
              props.onPageChange(data + 1)
            }}
            onRowsPerPageChange={props.onRowsPerPageChange}
            page={data?.current_page? data?.current_page-1 : 0}
            rowsPerPage={data?.per_page??0}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Grid>

      </Grid>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <StyledTableRow style={{ backgroundColor: "#f2f2f2" ,borderBottom:"1px solid #F1F1F1"}}>
                <StyledTableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={props.selectedRows.length > 0 && props.selectedRows.length < data?.data?.length}
                    checked={props.selectedRows.length === data?.data?.length}
                    onChange={handleSelectAll}
                  />
                </StyledTableCell>
                <StyledTableCell>SL</StyledTableCell>
                <StyledTableCell>{SUBSCRIPTION_PLAN.MAME}</StyledTableCell>
                <StyledTableCell>{SUBSCRIPTION_PLAN.DURATION}</StyledTableCell>
                <StyledTableCell>{SUBSCRIPTION_PLAN.PRICE}</StyledTableCell>
                <StyledTableCell>{SUBSCRIPTION_PLAN.STORAGE}</StyledTableCell>
                <StyledTableCell>{SUBSCRIPTION_PLAN.TYPE}</StyledTableCell>
                <StyledTableCell>{SUBSCRIPTION_PLAN.STATUS}</StyledTableCell>
                <StyledTableCell>{SUBSCRIPTION_PLAN.ACTION}</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {data?.data?.map((subscription, index) => {
                const isSelected = isRowSelected(subscription.id);
                const actualIndex = index + data?.from??0;
                return (
                  <TableRow hover key={subscription.id} >

                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        sx={{ color: "#9DA4AE" }}
                        checked={isSelected}
                        onChange={(event) => handleSelectOne(event, subscription.id)}
                      />
                    </TableCell>

                    <TableCell sx={{ color: "#9DA4AE",textDecoration:"none" }}>
                    <Link style={{ textDecoration:"none",color: "#9DA4AE" }} href={`${ADMIN.SUBSCRIPTION_EDIT_URL}/${subscription.id}`}>
                      {actualIndex}
                      </Link>
                      </TableCell>

                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="caption">
                        <Link style={{ textDecoration:"none",color: "#9DA4AE" }} href={`${ADMIN.SUBSCRIPTION_EDIT_URL}/${subscription.id}`}>
                          {subscription.name}
                          </Link>
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption">
                      <Link style={{ textDecoration:"none",color: "#9DA4AE" }} href={`${ADMIN.SUBSCRIPTION_EDIT_URL}/${subscription.id}`}>
                        {/* {durationHelper(subscription.validity?.name)} */}
                        {subscription.validity?.name}
                        </Link>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" sx={{ color: "#9DA4AE" }}>
                      <Link style={{ textDecoration:"none",color: "#9DA4AE" }} href={`${ADMIN.SUBSCRIPTION_EDIT_URL}/${subscription.id}`}>
                        {subscription.price == 0 || subscription.price == null ? "FREE" : subscription.price +' '+ props.currency }
                        </Link>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" sx={{ color: "#9DA4AE" }}>
                      <Link style={{ textDecoration:"none",color: "#9DA4AE" }} href={`${ADMIN.SUBSCRIPTION_EDIT_URL}/${subscription.id}`}>
                        {/* {storageHelper(subscription.storage_limit?.name)} */}
                        {subscription.storage_limit?.name}
                        </Link>
                      </Typography>
                    </TableCell>
                    <TableCell>
                    <Link style={{ textDecoration:"none",color: "#9DA4AE" }} href={`${ADMIN.SUBSCRIPTION_EDIT_URL}/${subscription.id}`}>

                        <Typography
                          sx={{
                            background: "#F6F6F6",
                            color: "#9DA4AE",
                            padding: "4px",
                            paddingLeft: "13px",
                            paddingRight: "13px",
                            borderRadius: "10px ",
                          }}
                          variant="caption"
                        >
                          {subscription.type == 1 ? SUBSCRIPTION_PLAN.REGULAR : SUBSCRIPTION_PLAN.SPECIAL}
                        </Typography>

                      </Link>
                    </TableCell>
                    <TableCell>
                    <Link style={{ textDecoration:"none",color: "#9DA4AE" }} href={`${ADMIN.SUBSCRIPTION_EDIT_URL}/${subscription.id}`}>
                      {subscription.status == "1" ? (
                        <Typography
                          style={{
                            background: "#F6F6F6",
                            color: "#9DA4AE",
                            padding: "4px",
                            paddingLeft: "10px",
                            paddingRight: "10px",
                            borderRadius: "20px ",
                          }}
                          variant="caption"
                        >
                          {SUBSCRIPTION_PLAN.ACTIVE}
                        </Typography>
                      ) : (
                        <Typography
                          style={{
                            background: "#F6F6F6",
                            color: "#9DA4AE",
                            padding: "4px",
                            paddingLeft: "10px",
                            paddingRight: "10px",
                            borderRadius: "20px ",
                          }}
                          variant="caption"
                        >
                          {SUBSCRIPTION_PLAN.INACTIVE}
                        </Typography>
                      )}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="more"
                        aria-controls="subscription-menu"
                        aria-haspopup="true"
                        onClick={(event)=>{
                            setListAction(event.currentTarget);
                            setActiveItem(subscription)
                        }}
                      >
                        <MoreHorizIcon />
                      </IconButton>
                      <Menu
                        id="subscription-menu"
                        anchorEl={listAction}
                        open={listAction??false}
                        onClose={handleMenuClose}
                        sx={{
                          marginTop:"30px"
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
                            href={`subscription/${activeItem?.id}`}
                            style={{ textDecoration: "none", color: "#9DA4AE", fontSize: "14px" }}
                          >
                            {SUBSCRIPTION_PLAN.DETAILS}{" "}
                            <ModeEditIcon sx={{ fontSize: "14px", marginLeft: "35px" }} />
                          </Link>
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            props.onDelete(activeItem);
                            handleMenuClose();
                          }}
                          style={{ textDecoration: "none", color: "#9DA4AE", fontSize: "14px" }}
                        >
                          {activeItem?.status == 0  ? 'Active':'Inactive'} <DeleteIcon sx={{ fontSize: "14px", marginLeft: "35px" }} />
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

SubscriptionTable.propTypes = {
  count: PropTypes.number,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
  onSearch: PropTypes.func,
  onDelete: PropTypes.func,
};

export default connect(mapStateToProps)(SubscriptionTable);
