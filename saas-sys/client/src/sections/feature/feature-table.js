import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { FEATURE_TABLE ,USER} from "../../common/constantData/language";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { FeatureSearch } from "./feature-search";
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



export const FeatureTable = (props) => {
  const {
    data = {},
    selected = [],
    onSearch,
  } = props;

console.log(data,"dsfjk>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")

  const [listAction, setListAction] = React.useState(null);
  const [statusMenu, setStatusMenu] = React.useState(null);
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
      let newSelected = props.selectedRows.filter((rowId) => rowId !== id)
      props.setSelectedRows(newSelected);
    }
    setShowDeleteButton(event.target.checked);
  };

  const isRowSelected = (id) => props.selectedRows.includes(id);


  ///////Checkbox end/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////select button //////////////////////////////////////////////////////////////////////////////////////////////////////


  const handleMenuClose = () => {
    setListAction(null);
    setActiveItem(null)
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
                    indeterminate={props.selectedRows.length > 0 && props.selectedRows.length < data?.data?.length}
                    checked={props.selectedRows.length === data?.data?.length}
                    onChange={handleSelectAll}
                  />
                </StyledTableCell>
                <StyledTableCell>SL</StyledTableCell>
                <StyledTableCell>{FEATURE_TABLE.MAME}</StyledTableCell>
                <StyledTableCell>{FEATURE_TABLE.PARENT}</StyledTableCell>
                <StyledTableCell>{FEATURE_TABLE.STATUS}</StyledTableCell>
                <StyledTableCell>{FEATURE_TABLE.ACTION}</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {data?.data?.map((feature, index) => {
                const isSelected = isRowSelected(feature.id);
                const actualIndex = index +data?.from??0 ;
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
                    <Link style={{ textDecoration:"none",color: "#9DA4AE" }} href={`${ADMIN.FEATURE_PLAN_EDIT}/${feature.id}`}>
                      {actualIndex}
                      </Link>
                      </TableCell>

                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="caption">
                        <Link style={{ textDecoration:"none",color: "#9DA4AE" }} href={`${ADMIN.FEATURE_PLAN_EDIT}/${feature.id}`}>

                          {feature.name}
                          </Link>
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption">
                      <Link style={{ textDecoration:"none",color: "#9DA4AE" }} href={`${ADMIN.FEATURE_PLAN_EDIT}/${feature.id}`}>
                      {feature.parent?.name}
                        </Link>
                      </Typography>
                    </TableCell>
                    <TableCell>
                    {feature.status == "1" ? (
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
                          {FEATURE_TABLE.ACTIVE}
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
                          {FEATURE_TABLE.INACTIVE}
                        </Typography>
                      )}
                    </TableCell>


                    <TableCell>
                      <IconButton
                        aria-label="more"
                        aria-controls="subscription-menu"
                        aria-haspopup="true"
                        onClick={(event)=>{
                          setListAction(event.currentTarget);
                          setActiveItem(feature)
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
                            href={`${ADMIN.FEATURE_PLAN_LIST}/${activeItem?.id}`}
                            style={{ textDecoration: "none", color: "#9DA4AE", fontSize: "14px" }}
                          >
                            {FEATURE_TABLE.DETAILS}{" "}
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

FeatureTable.propTypes = {
  count: PropTypes.number,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
  onSearch: PropTypes.func,
  onDelete: PropTypes.func,
};
