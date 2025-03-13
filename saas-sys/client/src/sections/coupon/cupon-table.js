import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { COUPON_TABLE ,USER} from "../../common/constantData/language";
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
import { getInitials } from "src/utils/get-initials";
import { ADMIN } from "../../common/constantData/screenUrl";
import { connect } from 'react-redux';
import getGlobalState from '../../stateManagement/global/globalSelector';

const mapStateToProps = (state) => ({
  currency: getGlobalState(state)?.currency,
});

const CouponTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    selected = [],
    onSearch,
  } = props;

///Checkbox///////////////////////////////////////////////////////////////////////////////////////////////////////////////
const [selectedRows, setSelectedRows] = useState(selected);
const [showDeleteButton, setShowDeleteButton] = useState(false);
const [activeItem, setActiveItem] = useState(0);

const handleSelectAll = (event) => {
  if (event.target.checked) {
    const selectedIds = items.map((subscription) => subscription.id);
    setSelectedRows(selectedIds);
  } else {
    setSelectedRows([]);
  }
  setShowDeleteButton(event.target.checked);
};

const handleSelectOne = (event, id) => {
  if (event.target.checked) {
    setSelectedRows((prevSelectedRows) => [...prevSelectedRows, id]);
  } else {
    setSelectedRows((prevSelectedRows) => prevSelectedRows.filter((rowId) => rowId !== id));
  }
  setShowDeleteButton(event.target.checked);
};

useEffect(()=>{
  console.log(".......selectedRows......",selectedRows)
},[selectedRows])

const isRowSelected = (id) => selectedRows.includes(id);


///////Checkbox end/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////select button //////////////////////////////////////////////////////////////////////////////////////////////////////

const [anchorEl, setAnchorEl] = React.useState(null);
const [anchorE2, setAnchorE2] = React.useState(null);
const [anchorE3, setAnchorE3] = React.useState(null);

const handleMenuOpen = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleMenuClose = () => {
  setAnchorEl(null);
  setActiveItem(null)
};

const handleMenuOpen2 = (event) => {
  setAnchorE2(event.currentTarget);
};

const handleMenuClose2 = () => {
  setAnchorE2(null);
};

const handleMenuOpen3 = (event) => {
  setAnchorE3(event.currentTarget);
};

const handleMenuClose3 = () => {
  setAnchorE3(null);
};

const isMenuOpen = Boolean(anchorEl);
const isMenuOpen2 = Boolean(anchorE2);
const isMenuOpen3 = Boolean(anchorE3);

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

/////// header style end////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
              onClick={handleMenuOpen2}
            >
              Status <ExpandMoreIcon />
            </Button>
            <Menu
              id="subscription-menu"
              anchorEl={anchorE2}
              open={isMenuOpen2}
              onClose={handleMenuClose2}
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
                onClick={()=> {props.onFilter(1); setAnchorE2(null);}}
                style={{ textDecoration: "none", color: "#9DA4AE", fontSize: "14px" }}
              >
                Active
              </MenuItem>
              <MenuItem
                onClick={()=> {props.onFilter(0);  setAnchorE2(null);}}
                style={{ textDecoration: "none", color: "#9DA4AE", fontSize: "14px" }}
              >
                Inactive{" "}
              </MenuItem>
            </Menu>
          </>
        </Grid>
        {showDeleteButton ? (
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
                onClick={handleMenuOpen3}
              >
                Action <ExpandMoreIcon />
              </Button>
              <Menu
                id="subscription-menu"
                anchorEl={anchorE3}
                open={isMenuOpen3}
                onClose={handleMenuClose3}
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
                  onClick={() => props.onDelete(selectedRows, 0)}
                  style={{ textDecoration: "none", color: "#9DA4AE", fontSize: "14px" }}
                >
                  Inactive <DeleteIcon sx={{ fontSize: "14px", marginLeft: "35px" }} />
                </MenuItem>
                <MenuItem
                  onClick={() => props.onDelete(selectedRows, 1)}
                  style={{ textDecoration: "none", color: "#9DA4AE", fontSize: "14px" }}
                >
                  Active
                </MenuItem>
              </Menu>
            </>
          </Grid>
        ):(<Grid item xs={1} md={1.5}></Grid>)}
        <Grid item xs={8} md={6} >
          <TablePagination
            component="div"
            count={count}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
            page={page}
            rowsPerPage={rowsPerPage}
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
                    indeterminate={selectedRows.length > 0 && selectedRows.length < items.length}
                    checked={selectedRows.length === items.length}
                    onChange={handleSelectAll}
                  />
                </StyledTableCell>
                <StyledTableCell>SL</StyledTableCell>
                <StyledTableCell>{COUPON_TABLE.CUDE}</StyledTableCell>
                <StyledTableCell>{COUPON_TABLE.AMOUNT}</StyledTableCell>
                <StyledTableCell>{COUPON_TABLE.START_DATE}</StyledTableCell>
                <StyledTableCell>{COUPON_TABLE.EXPIRE_DATE}</StyledTableCell>
                <StyledTableCell>{COUPON_TABLE.USER_TYPE}</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>{COUPON_TABLE.ACTION}</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {items.map((feature, index) => {
                const isSelected = isRowSelected(feature.id);
                const actualIndex = index + page * rowsPerPage + 1;
                return (
                  <TableRow hover key={feature.id} >

                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        sx={{ color: "#9DA4AE" }}
                        checked={isSelected}
                        onChange={(event) => handleSelectOne(event, feature.id)}
                      />
                    </TableCell>

                    <TableCell sx={{ color: "#9DA4AE",textDecoration:"none" }}>
                    <Link style={{ textDecoration:"none",color: "#9DA4AE" }} href={`${ADMIN.COUPON_PLAN_EDIT}/${feature.id}`}>
                      {actualIndex}
                      </Link>
                      </TableCell>

                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="caption">
                        <Link style={{ textDecoration:"none",color: "#9DA4AE" }} href={`${ADMIN.COUPON_PLAN_EDIT}/${feature.id}`}>

                        {getInitials(feature.code)}
                          </Link>
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption">
                      <Link style={{ textDecoration:"none",color: "#9DA4AE" }} href={`${ADMIN.COUPON_PLAN_EDIT}/${feature.id}`}>
                      {feature.discount_type == "1" ? (
                        <label>{feature.amount} %</label>
                      ) : (
                        <label>{feature.amount} {props?.currency??$}</label>
                      )}
                        </Link>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="caption">
                        <Link style={{ textDecoration:"none",color: "#9DA4AE" }} href={`${ADMIN.COUPON_PLAN_EDIT}/${feature.id}`}>

                        {feature.start_date}
                          </Link>
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="caption">
                        <Link style={{ textDecoration:"none",color: "#9DA4AE" }} href={`${ADMIN.COUPON_PLAN_EDIT}/${feature.id}`}>

                        {feature.end_date}
                          </Link>
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" sx={{ color: "#9DA4AE" }}>
                      <Link style={{ textDecoration:"none",color: "#9DA4AE" }} href={`${ADMIN.COUPON_PLAN_EDIT}/${feature.id}`}>
                      {feature.user_type == "0" ? (
                        <label>All user</label>
                      ) : (
                        <label>Specific user</label>
                      )}
                        </Link>
                      </Typography>
                    </TableCell>


                    <TableCell>
                      <Typography variant="caption" sx={{ color: "#9DA4AE" }}>
                      <Link style={{ textDecoration:"none",color: "#9DA4AE" }} href={`${ADMIN.COUPON_PLAN_EDIT}/${feature.id}`}>
                      {feature.status == "0" ? (
                        <label>Inactive</label>
                      ) : (
                        <label>Active</label>
                      )}
                        </Link>
                      </Typography>
                    </TableCell>


                    <TableCell>
                      <IconButton
                        aria-label="more"
                        aria-controls="subscription-menu"
                        aria-haspopup="true"
                        onClick={(event)=>{
                          setAnchorEl(event.currentTarget);
                          setActiveItem(feature)
                      }}
                      >
                        <MoreHorizIcon />
                      </IconButton>
                      <Menu
                        id="subscription-menu"
                        anchorEl={anchorEl}
                        open={isMenuOpen}
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
                           href={`${ADMIN.COUPON_PLAN_LIST}/${activeItem?.id}`}
                            style={{ textDecoration: "none", color: "#9DA4AE", fontSize: "14px" }}
                          >
                            {COUPON_TABLE.DETAILS}
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

CouponTable.propTypes = {
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
export default connect(mapStateToProps)(CouponTable);
