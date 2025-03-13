import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";
import { Box, Button, Stack } from "@mui/material";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";

export const SubscriptionPlanSearch = ({ onSearch }) => {
  const handleInputChange = (event) => {
    const query = event.target.value;
    onSearch(query);
  };

  const handleSearch = () => {
    // Perform search operation or additional logic if needed
    // This function can be customized as per your requirements
  };

  return (
    <Card sx={{ p: 2 }}>
      <Stack spacing={3}>
        <Stack direction="row" justifyContent="space-between" spacing={4}>
          <Stack spacing={1}>
            {/*<Stack alignItems="center" direction="row" spacing={1}>*/}
            {/*  <Button*/}
            {/*    color="inherit"*/}
            {/*    startIcon={*/}
            {/*      <SvgIcon fontSize="small">*/}
            {/*        <ArrowDownOnSquareIcon />*/}
            {/*      </SvgIcon>*/}
            {/*    }*/}
            {/*  >*/}
            {/*    Export*/}
            {/*  </Button>*/}
            {/*</Stack>*/}
          </Stack>

          <OutlinedInput
            onChange={handleInputChange}
            fullWidth
            placeholder="Search feature"
            startAdornment={
              <InputAdornment position="start">
                <SvgIcon color="action" fontSize="small">
                  <MagnifyingGlassIcon />
                </SvgIcon>
              </InputAdornment>
            }
            sx={{ maxWidth: 500, float: "right" }}
          />
          {/* <Button
            variant="contained"
            onClick={handleSearch}
            sx={{
              background: "#00467a",
              color: "white",
              border: "",
            }}
          >
            Search
          </Button> */}
        </Stack>
      </Stack>
    </Card>
  );
};
