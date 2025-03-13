import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { notificationApiCall, notificationSeenApiCall } from "../../common/apiCall/api";
import { useEffect } from "react";
import Alert from "@mui/material/Alert";
import { TopNav } from "./top-nav";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "red",
  "&:hover": {
    backgroundColor: "#F6F7F7",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export const TopBer = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(null);
  const [detailsid, setdetailsid] = useState(null);
  const [perpage, setperpage] = useState(1);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMenuClose2 = ({ id }) => {
    const data = {
      notification_details_id: id,
      status: 1,
    };
    notificationSeenApiCall(data).then((response) => {
      setdetailsid(id);
    });
  };
  const handleMenuClose3 = ({ id }) => {
    const data = {
      notification_details_id: id,
      status: 2,
    };
    notificationSeenApiCall(data).then((response) => {
      setdetailsid(id);
    });
  };

  const handleMenuClose4 = () => {
    setperpage(perpage + 1);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const fetchNotification = (queryparam = null) => {
    notificationApiCall(queryparam)
      .then((response) => {
        if (response?.code == 200) {
          setData(response?.data?.notifications?.data);
          setTotal(response?.data?.notification_count);
          setLoading(false);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    let query = "page=" + perpage;

    fetchNotification(query);
  }, [perpage, detailsid, setdetailsid]);

  console.log(detailsid, "data>>");
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{ mt: "2%" }}
    >
      {total == 0 ? (
        <MenuItem key={data.id} onClick={handleMenuClose}>
          You have no notification
        </MenuItem>
      ) : (
        <>
          {data?.map((data) => (
            <MenuItem key={data.id}>
              {data?.seen_status == 0 ? (
                <Alert icon={false} severity="success" sx={{ width: "100%" }}>
                  <div
                    style={{ float: "right", marginLeft: "2%" }}
                    onClick={() => handleMenuClose3({ id: data.id })}
                  >
                    <DeleteIcon sx={{ color: "red" }} />
                  </div>
                  <div onClick={() => handleMenuClose2({ id: data.id })}>
                    <Typography sx={{ color: "#6147c3" }}>{data?.notification?.title}</Typography>
                    <Typography>{data?.notification?.message}</Typography>
                  </div>
                </Alert>
              ) : (
                <Alert icon={false} severity="warning">
                  <div
                    style={{ float: "right", marginLeft: "2%" }}
                    onClick={() => handleMenuClose3({ id: data.id })}
                  >
                    <DeleteIcon sx={{ color: "red" }} />
                  </div>
                  <div onClick={() => handleMenuClose2({ id: data.id })}>
                    <Typography sx={{ color: "#6147c3" }}>{data?.notification?.title}</Typography>
                    <Typography>{data?.notification?.message}</Typography>
                  </div>
                </Alert>
              )}
            </MenuItem>
          ))}
        </>
      )}
      {/* <IconButton
        onClick={() => handleMenuClose4()}
        sx={{ fontSize: "15px", width: "100%", color: "#6147c3" }}
      >
        see more notification
      </IconButton> */}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  return (
    <Box sx={{ width: "100%", background: "#F6F7F7" }}>
      <AppBar position="fixed" sx={{ width: "100%", background: "white" }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton> */}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              disableRipple
              sx={{
                "&:hover": {
                  backgroundColor: "transparent", // Removes hover background
                },
              }}
            >
              <Badge badgeContent={total} color="secondary" sx={{ backgroundColor: "#e2faca",
                borderRadius: "8px",
                padding: "6px",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#c8e6a0",
                },
}}>
                <NotificationsIcon sx={{ color: "#70b42c" }} />
              </Badge>

            </IconButton>
            {/* <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton> */}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};
