import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { USER ,STORAGE} from "../../common/constantData/language";
//change//
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { StorageLimitSearch } from "./storage-limit-search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
///////////
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
  Avatar,
  //change
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Checkbox,

} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";
import { ADMIN } from "../../common/constantData/screenUrl";
import { userTypesName } from '../../common/helpers';

export const StorageLimitTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    selected = [],
    //change
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
  const truncateText = (text, limit) => {
    if (text.length <= limit) {
      return text;
    }
    return text.slice(0, limit) + "...";
  };

  return (
    
    <Card sx={{border:"1px solid #eee", borderRadius:"10px"}}>
      <Grid container spacing={2}>
        <Grid item xs={3} md={3}>
          <div style={{ width: "100%", padding: "10px" }}>
            <StorageLimitSearch onSearch={onSearch} />
          </div>
          
        </Grid>
        <Grid item xs={9} md={9} >
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
                    //checked={selectedRows.length === items.length}
                    //onChange={handleSelectAll}
                  />
                </StyledTableCell>
                <StyledTableCell>SL</StyledTableCell>
                <StyledTableCell>{STORAGE.NAME}</StyledTableCell>
                <StyledTableCell>{STORAGE.SIZE}</StyledTableCell>
                <StyledTableCell>{STORAGE.ACTION}</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {items.map((storage, index) => {
                const isSelected = isRowSelected(storage.id);
                const actualIndex = index + page * rowsPerPage + 1;
                return (
                  <TableRow hover key={storage.id} >
                    
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        sx={{ color: "#9DA4AE" }}
                        //checked={isSelected}
                        //onChange={(event) => handleSelectOne(event, storage.id)}
                      />
                    </TableCell>
                    
                    <TableCell sx={{ color: "#9DA4AE",textDecoration:"none" }}>
                    <Link style={{ textDecoration:"none",color: "#9DA4AE" }} href={`${ADMIN.STORAGE_EDIT_URL}/${storage.id}`}>
                      {actualIndex}
                      </Link>
                      </TableCell>
                    
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="caption">
                        <Link style={{ textDecoration:"none",color: "#9DA4AE" }} href={`${ADMIN.STORAGE_EDIT_URL}/${storage.id}`}>
                        
                          {storage.name}
                          </Link>
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption">
                      <Link style={{ textDecoration:"none",color: "#9DA4AE" }} href={`${ADMIN.STORAGE_EDIT_URL}/${storage.id}`}>
                          {storage.size} MB
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
                          setActiveItem(storage)
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
                            href={`storage-limit/edit/${activeItem?.id}`}
                            style={{ textDecoration: "none", color: "#9DA4AE", fontSize: "14px" }}
                          >
                            {STORAGE.EDIT}{" "}
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

StorageLimitTable.propTypes = {
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