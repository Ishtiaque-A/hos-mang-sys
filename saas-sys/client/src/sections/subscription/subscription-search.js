import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import {  InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";
import {  Stack } from "@mui/material";

export const SubscriptionSearch = ({ onSearch }) => {

   return (
      <Stack spacing={3}>
        <Stack direction="row" justifyContent="space-between" spacing={4}>
          <OutlinedInput
            onChange={(event) =>onSearch(event.target.value)}
            style={{ width: '300px', height: '40px',borderRadius:"30px" }}
            placeholder="Search "
            startAdornment={
              <InputAdornment position="start">
                <SvgIcon color="action" fontSize="small">
                  <MagnifyingGlassIcon />
                </SvgIcon>
              </InputAdornment>
            }
            sx={{ maxWidth: 500, float: "right" }}
          />
        </Stack>
      </Stack>

  );
};
