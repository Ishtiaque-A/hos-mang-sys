import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import { FlexBox } from "../../components/flex-box";
import {  useRef, useState } from "react"; // styled components
import DehazeIcon from '@mui/icons-material/Dehaze';

import {
  Card,
  Box,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { usePopover } from "src/hooks/use-popover";
import { AccountPopover } from "./account-popover";

export const SearchOutlinedIcon = styled(SearchOutlined)(({ theme }) => ({
  color: "#D4D0D0",
  background:"#E32727",
  width:"80px",
  fontSize:"48px",
  
  padding:"10px",


})); // also used in the GrocerySearchBox component

export const SearchResultCard = styled(Card)(() => ({
  zIndex: 99,
  top: "100%",
  width: "100%",
  position: "absolute",
  paddingTop: "0.5rem",
  paddingBottom: "0.5rem",
}));

const DropDownHandler = styled(FlexBox)(({ theme }) => ({
  whiteSpace: "pre",
  // borderLeft: `1px solid ${theme.palette.text.disabled}`,
  [theme.breakpoints.down("xs")]: {
    display: "none",
  },
}));

const SIDE_NAV_WIDTH = 80;
const TOP_NAV_HEIGHT = 64;

export const TopNav = (props) => {
  const { onNavOpen } = props;
  console.log(onNavOpen,"onNavOpen");
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const accountPopover = usePopover();
  const [category, setCategory] = useState("");
  const [resultList, setResultList] = useState([]);
  const parentRef = useRef();

  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: "blur(6px)",
          backgroundColor: "#F6F7F7",
          position: "sticky",
          left: {
            lg: `${SIDE_NAV_WIDTH}px`,
          },
          top: 0,
          width: '15%',
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2,
          }}
        >
          <Stack alignItems="center" direction="row" spacing={2}>
            <Box
              
              sx={{
                display: "inline-flex",
                height: 32,
                width: 32,
              }}
            >
              <button onClick={onNavOpen} style={{background:"#FFFF",marginLeft:"10px"}}><DehazeIcon sx={{fontSize:"30px",}}/></button>

            </Box>
            
          </Stack>
          <Stack alignItems="center" direction="row" spacing={2}>
            
            
            
            
          </Stack>
        </Stack>
      </Box>
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />
    </>
  );
};

TopNav.propTypes = {
  onNavOpen: PropTypes.func,
};
