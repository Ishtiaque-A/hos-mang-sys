import NextLink from "next/link";
import { usePathname } from "next/navigation";
import PropTypes from "prop-types";
import {
  Box,
  Avatar,
  useMediaQuery,
  Divider,
  Drawer,
  Stack,
  Typography,
  Grid,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { items } from "./config";
import { items2 } from "./config2";
import { items3 } from "./config3";
import { items4 } from "./config4";
import { useRouter } from "next/navigation";
import { SideNavItem } from "./side-nav-item";
import { usePopover } from "src/hooks/use-popover";
import { AccountPopover } from "./account-popover";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BusinessIcon from "@mui/icons-material/Business";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { logoutApiGet, redirectToken } from "../../common/apiCall/api";
import { useAuth } from "src/hooks/use-auth";
import { LOGIN_SCREEN_URL } from "../../common/constantData/screenUrl";
import SettingsIcon from "@mui/icons-material/Settings";
import getGlobalState from "../../stateManagement/global/globalSelector";
import getAuthState from "../../stateManagement/auth/AuthSelector";
import { connect } from "react-redux";
import { LINKED_APP_URL } from "../../common/constantData/constants";
import Image from "next/image";
import logo from "../../../public/assets/logos/logo.png"
import { size } from "lodash";
import { width } from "@mui/system";

const mapStateToProps = (state) => ({
  settings: getGlobalState(state)?.settings,
  userProfile: getAuthState(state)?.userProfile,
  validity: getGlobalState(state)?.validity,
});

const mapDispatchToProps = (dispatch) => ({});
const SideNav = (props) => {
  const auth = useAuth();
  const router = useRouter();
  const { open, onClose } = props;
  const pathname = usePathname();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const accountPopover = usePopover();

  const handleSignOut = () => {
    logoutApiGet()
      .then((response) => {
        localStorage.removeItem("token");
        auth.signOut();
        router.push(LOGIN_SCREEN_URL);
        setHeaders("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const redirectUrl = () => {
    let to_url = LINKED_APP_URL;
    redirectToken({ to_url: to_url })
      .then((response) => {
        window.location.href = to_url + "?token=" + response?.data?.token;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(props?.settings, "settings");
  const content = (
    <Scrollbar
      sx={{
        height: "100%",
        "& .simplebar-content": {
          height: "100%",
        },
        "& .simplebar-scrollbar:before": {
          background: "neutral.400",
        },

        background: "#FFFF",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box sx={{ paddingBottom: 0 }}>
          <Box
            sx={{
              display: "inline-flex",
              height: 32,
              width: 40,
              marginLeft: "6px",
              marginTop: "10px"
            }}
            
          >
            <>
              <Box component="header">
                <Stack
                // alignItems="center"
                // direction="row"
                // justifyContent="start"
                spacing={20}
                >
                  <Stack direction="row" spacing={0} style={{display:"flex", justifyContent:"center"}}>
                    {/* <ArrowBackIcon
                      sx={{
                        color: "#089B1A",
                        cursor: "pointer",
                        height: 20,
                        width: 80,
                        justifyItems: "left",
                        marginLeft: "-4%",
                        marginTop: "10%",
                      }}
                    /> */}
                    {/* <img src="../../../public/assets/logos/logo.png" alt="image" /> */}
    {/*                    <Image style={{width:"200px", height:"70px", }} alt="image" src={logo}/>
*/}
<h5
                      style={{
                        color: "#089B1A",
                        lineHeight: "1.5",
                        cursor: "pointer",
                        height: 50,
                        width: 200,
                        display: "flex",
                        justifyItems: "center",
                        // marginLeft: "-7%",
                        marginTop: "4%",
                          marginLeft: "15px",
                        fontSize: "30px",
                        fontFamily: "system-ui",
                        // float: "center"
                      }}
                    >
    SmartHealth
                    </h5>
                    {/*  */}
                    {/* <Avatar
                      ref={accountPopover.anchorRef}
                      sx={{
                        position: "relative",
                        top: "14px",
                        left: "-5px",
                        cursor: "pointer",
                        height: 32,
                        width: 32,
                        background: "transparent",
                        border: "1px solid #D3D9DB",
                        color: "#78858a",
                        fontSize: "18px",
                      }}
                    >
                      ?
                    </Avatar> */}
                  </Stack>
                </Stack>
                
              </Box>
              <AccountPopover
                anchorEl={accountPopover.anchorRef.current}
                open={accountPopover.open}
                onClose={accountPopover.handleClose}
              />
            </>
          </Box>
        </Box>
        {/* <Divider sx={{ borderColor: "neutral.700" }} /> */}
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3,
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: "none",
              p: 0,
              m: 0,
              marginTop: "0%",
            }}
          >
            <Divider sx={{ marginBottom: "20px", marginTop: "10px" }} />
            <Stack direction="row" spacing={2} sx={{ paddingBottom: "10px", width: "100%" }}>
              {props?.userProfile?.photo ? (
                <Avatar
                  src={props?.userProfile?.photo}
                  sx={{
                    bgcolor: "#78858a",
                    height: { xs: 30, md: 28 }, // Example: Adjust height for different breakpoints
                    width: { xs: 30, md: 28 }, // Example: Adjust width for different breakpoints
                    marginTop: { xs: "10px", md: "20px" }, // Example: Adjust margin for different breakpoints
                  }}
                  alt="Remy Sharp"
                />
              ) : (
                <Avatar
                  sx={{
                    bgcolor: "#78858a",
                    height: { xs: 30, md: 28 }, // Example: Adjust height for different breakpoints
                    width: { xs: 30, md: 28 }, // Example: Adjust width for different breakpoints
                    marginTop: { xs: "10px", md: "20px" }, // Example: Adjust margin for different breakpoints
                  }}
                  alt="Remy Sharp"
                >
                  N
                </Avatar>
              )}
              {/* <Stack
                direction={{ xs: "column", md: "row" }} // Example: Stack direction changes on different breakpoints
                alignItems="center" // Example: Align items changes on different breakpoints
                spacing={1}
                sx={{ width: "100%" }}
              >
                <Typography
                  variant="subtitle1"
                  component="label"
                  color="#636f73"
                  sx={{
                    width: "60%",
                    fontSize: { xs: "14px", md: "15px" }, // Example: Adjust font size for different breakpoints
                    marginTop: { xs: "10px", md: "22px" }, // Example: Adjust margin for different breakpoints
                    fontWeight: "bold",
                    color: "#121212",
                    //fontWeight: "Avenir Next",
                    fontFamily: "system-ui",
                  }}
                >
                  {props?.userProfile?.name}
                </Typography>
                <Typography
                  variant="subtitle2"
                  component="label"
                  color="#636f73"
                  sx={{
                    position: "relative",
                    fontSize: { xs: "12px", md: "11px" }, // Example: Adjust font size for different breakpoints
                    left: { xs: 0, md: "14%" }, // Example: Adjust margin for different breakpoints
                    top: { xs: "10px", md: "22px" }, // Example: Adjust margin for different breakpoints
                    cursor: "pointer",
                    color: "#089B1A",
                    width: "35%",
                    fontFamily: "system-ui",
                  }}
                  onClick={handleSignOut}
                >
                  Log Out
                </Typography>
              </Stack> */}

              <Stack
                direction={{ xs: "column", md: "row" }} // Stack direction changes based on screen size
                alignItems="center" // Ensure items are aligned properly
                spacing={1}
                sx={{ width: "100%" }}
              >
                <Typography
                  variant="subtitle1"
                  component="label"
                  sx={{
                    width: "60%",
                    fontSize: { xs: "14px", md: "15px" },
                    fontWeight: "bold",
                    color: "#121212",
                    fontFamily: "system-ui",
                    textAlign: { xs: "center", md: "left" }, // Center on small screens, left-align on larger screens
                  }}
                >
                  {props?.userProfile?.name}
                </Typography>

                <Typography
                  variant="subtitle2"
                  component="label"
                  sx={{
                    fontSize: { xs: "12px", md: "11px" },
                    cursor: "pointer",
                    color: "#089B1A",
                    width: "35%",
                    fontFamily: "system-ui",
                    textAlign: { xs: "center", md: "left" }, // Center on small screens, left-align on larger screens
                  }}
                  onClick={handleSignOut}
                >
                  Log Out
                </Typography>
              </Stack>
            </Stack>
            {items2
              .filter((item) => item.access.includes(parseInt(props?.userProfile?.user_type)))
              .map((item) => {
                const active = item.path ? pathname === item.path : false;

                return (
                  <div style={{ marginLeft: "10%", fontFamily: "system-ui" }}>
                    <SideNavItem
                      active={active}
                      disabled={item.disabled}
                      external={item.external}
                      key={item.title}
                      path={item.path}
                      title={item.title}
                    />
                  </div>
                );
              })}
            <Stack direction="row" spacing={2} sx={{ paddingBottom: "10px", color: "#636f73" }}>
              <BusinessIcon sx={{ height: 30, width: 30, marginTop: "20px" }} />
              <label
                style={{
                  color: "#121212",
                  fontSize: "15px",
                  marginTop: "7px",
                  fontWeight: "530",
                  lineHeight: "1.2",
                  fontFamily: "system-ui",
                }}
              >
                Administration
              </label>
            </Stack>

            {items
              .filter((item) => item.access.includes(parseInt(props?.userProfile?.user_type)))
              .map((item) => {
                const active = item.path ? pathname === item.path : false;

                return (
                  <div style={{ marginLeft: "10%", fontFamily: "system-ui" }}>
                    <SideNavItem
                      active={active}
                      disabled={item.disabled}
                      external={item.external}
                      // icon={item.icon}
                      key={item.title}
                      path={item.path}
                      title={item.title}
                      sx={{}}
                    />
                  </div>
                );
              })}

            <Stack direction="row" spacing={2} sx={{ paddingBottom: "10px", color: "#636f73" }}>
              <EditNoteIcon sx={{ height: 30, width: 30, marginTop: "20px" }} />
              <label
                style={{
                  color: "#121212",
                  fontSize: "15px",
                  marginTop: "7px",
                  fontWeight: "530",
                  lineHeight: "1.2",
                  fontFamily: "system-ui",
                }}
              >
                Audit & Report
              </label>
            </Stack>
            
            {items4
              .filter((item) => item.access.includes(parseInt(props?.userProfile?.user_type)))
              .map((item) => {
                const active = item.path ? pathname === item.path : false;

                return (
                  <div style={{ marginLeft: "10%", fontFamily: "system-ui" }}>
                    <SideNavItem
                      active={active}
                      disabled={item.disabled}
                      external={item.external}
                      // icon={item.icon}
                      key={item.title}
                      path={item.path}
                      title={item.title}
                      sx={{}}
                    />
                  </div>
                );
              })}
            <Stack direction="row" spacing={2} sx={{ paddingBottom: "10px", color: "#636f73" }}>
              <SettingsIcon sx={{ height: 30, width: 30, marginTop: "20px" }} />
              <label
                style={{
                  color: "#121212",
                  fontSize: "15px",
                  marginTop: "7px",
                  fontWeight: "530",
                  lineHeight: "1.2",
                  fontFamily: "system-ui",
                }}
              >
                System Settings
              </label>
            </Stack>
            {items3
              .filter((item) => item.access.includes(parseInt(props?.userProfile?.user_type)))
              .map((item) => {
                const active = item.path ? pathname === item.path : false;

                return (
                  <div style={{ marginLeft: "10%", fontFamily: "system-ui" }}>
                    <SideNavItem
                      active={active}
                      disabled={item.disabled}
                      external={item.external}
                      key={item.title}
                      path={item.path}
                      title={item.title}
                    />
                  </div>
                );
              })}
          </Stack>
        </Box>
        <Box
          sx={{
            px: 2,
            py: 3,
          }}
        >
          <Typography color="neutral.100" variant="subtitle2"></Typography>
          <Typography color="neutral.500" variant="body2">
            SmartHealth
          </Typography>
        </Box>
      </Box>
    </Scrollbar>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "common.white",
            color: "common.white",
            width: 260,
            // paddingLeft: "1%",
            marginRight: "1%"
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.800",
          color: "common.white",
          width: 305,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);