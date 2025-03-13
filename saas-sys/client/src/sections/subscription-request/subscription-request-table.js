import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { SUBSCRIPTION_PLAN_REQUEST} from "../../common/constantData/language";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { CouponSearch } from "./cupon-search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
import { ADMIN } from "../../common/constantData/screenUrl";




export const SubscriptionRequestTable = (props) => {
  const {
    data={},
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

  const isRowSelected = (id) => props?.selectedRows?.includes(id);



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
        <Grid item xs={2} md={3}>
          <div style={{ width: "100%", padding: "10px" }}>
            <CouponSearch onSearch={onSearch} />
          </div>

        </Grid>
        <Grid item xs={1} md={1.5}>
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
                style={{ textDecoration: "none", color: "#9DA4AE", fontSize: "14px" , backgroundColor: props.selectedStatus ==null ? "lightgray":""}}
              >
                All
              </MenuItem>
              <MenuItem
                onClick={()=> {
                  props.statusFilter(0)
                  setStatusMenu(null);
                }}                style={{ textDecoration: "none", color: "#9DA4AE", fontSize: "14px" , backgroundColor: props.selectedStatus == 0 ? "lightgray":""}}
              >
                Not Seen
              </MenuItem>
              <MenuItem
                onClick={()=> {
                  props.statusFilter(1)
                  setStatusMenu(null);
                }}                style={{ textDecoration: "none", color: "#9DA4AE", fontSize: "14px" , backgroundColor: props.selectedStatus == 1 ? "lightgray":""}}
              >
                Seen
              </MenuItem>
              <MenuItem
                onClick={()=> {
                  props.statusFilter(2)
                  setStatusMenu(null);
                }}                style={{ textDecoration: "none", color: "#9DA4AE", fontSize: "14px" , backgroundColor: props.selectedStatus == 2 ? "lightgray":""}}
              >
                Accepted
              </MenuItem>
              <MenuItem
                onClick={()=> {
                  props.statusFilter(3)
                  setStatusMenu(null);
                }}                style={{ textDecoration: "none", color: "#9DA4AE", fontSize: "14px" , backgroundColor: props.selectedStatus == 3 ? "lightgray":""}}
              >
                Rejected
              </MenuItem>
            </Menu>
          </>
        </Grid>
        {showDeleteButton && props?.selectedRows?.length>0? (
          <Grid item xs={1} md={1.5}>
            <>
              <Button
                sx={{
                  color: "#000",
                  background: "#F1EEEE",
                  marginLeft: "10px",
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
                  onClick={() => { props.multipleStatusChange(1);setAction(null)}}
                  style={{ textDecoration: "none", color: "#9DA4AE", fontSize: "14px" }}
                >
                  Seen <DeleteIcon sx={{ fontSize: "14px", marginLeft: "35px" }} />
                </MenuItem>
                <MenuItem
                  onClick={() => { props.multipleStatusChange(0);setAction(null)}}
                  style={{ textDecoration: "none", color: "#9DA4AE", fontSize: "14px" }}
                >
                  Unseen <DeleteIcon sx={{ fontSize: "14px", marginLeft: "35px" }} />
                </MenuItem>
                <MenuItem
                  onClick={() => { props.multipleStatusChange(3);setAction(null)}}
                  style={{ textDecoration: "none", color: "#9DA4AE", fontSize: "14px" }}
                >
                  Rejected <DeleteIcon sx={{ fontSize: "14px", marginLeft: "35px" }} />
                </MenuItem>
              </Menu>
            </>
          </Grid>
        ):(<Grid item xs={1} md={1.5}></Grid>)}
        <Grid item xs={8} md={6} >
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
                    indeterminate={props?.selectedRows?.length > 0 && props?.selectedRows?.length < data?.data?.length}
                    checked={props?.selectedRows?.length == data?.data?.length}
                    onChange={handleSelectAll}
                  />
                </StyledTableCell>
                <StyledTableCell>SL</StyledTableCell>
                <StyledTableCell>{SUBSCRIPTION_PLAN_REQUEST.MAME}</StyledTableCell>
                <StyledTableCell>{SUBSCRIPTION_PLAN_REQUEST.EMAIL}</StyledTableCell>
                <StyledTableCell>{SUBSCRIPTION_PLAN_REQUEST.PHONE}</StyledTableCell>
                <StyledTableCell>{SUBSCRIPTION_PLAN_REQUEST.SUBSCRIPTION_PLAN_TYPE}</StyledTableCell>
                <StyledTableCell>{SUBSCRIPTION_PLAN_REQUEST.STATUS}</StyledTableCell>
                <StyledTableCell>{SUBSCRIPTION_PLAN_REQUEST.ACTION}</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {data?.data?.map((Request, index) => {
                const isSelected = isRowSelected(Request?.id);
                const actualIndex = index + data?.from??0;
                return (
                  <TableRow hover key={Request.id} >

                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        sx={{ color: "#9DA4AE" }}
                        checked={isSelected}
                        onChange={(event) => handleSelectOne(event, Request.id)}
                      />
                    </TableCell>

                    <TableCell sx={{ color: "#9DA4AE",textDecoration:"none" }}>{actualIndex}
                      </TableCell>

                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="caption">
                       {Request.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption">
                      {Request.email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" sx={{ color: "#9DA4AE" }}>
                      {Request.mobile}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" sx={{ color: "#9DA4AE" }}>
                       {Request.subscription_plan?.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                    {
                      Request.status == "0" ? (
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
                          {SUBSCRIPTION_PLAN_REQUEST.PENDING}
                        </Typography>
                      ) :Request.status == "1"? (
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
                          {SUBSCRIPTION_PLAN_REQUEST.REVIEWING}
                        </Typography>
                      ):Request.status == "2" ?(
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
                          {SUBSCRIPTION_PLAN_REQUEST.ACCEPTED}
                        </Typography>
                      ):Request.status == "3" ?(
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
                        {SUBSCRIPTION_PLAN_REQUEST.REJECTED}
                      </Typography>
                    ):(<></>)}
                    </TableCell>


                    <TableCell>
                      <IconButton
                        aria-label="more"
                        aria-controls="subscription-menu"
                        aria-haspopup="true"
                        onClick={(event)=>{
                          setListAction(event.currentTarget);
                          setActiveItem(Request)
                        }}
                      >
                        <MoreHorizIcon />
                      </IconButton>
                      <Menu
                        id="subscription-menu"
                        anchorEl={listAction}
                        open={listAction??false}
                        onClose={()=>setListAction(null)}
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
                        <MenuItem o
                                  onClose={()=>setListAction(null)}
                        >
                          <Link
                            href={`${ADMIN.SUBSCRIPTION_REQUEST}/${activeItem.id}`}
                            style={{ textDecoration: "none", color: "#9DA4AE", fontSize: "14px" }}
                          >
                            {SUBSCRIPTION_PLAN_REQUEST.DETAILS}
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

SubscriptionRequestTable.propTypes = {};
