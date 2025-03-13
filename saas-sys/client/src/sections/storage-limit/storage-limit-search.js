import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";
import { Box, Button, Stack } from "@mui/material";

export const StorageLimitSearch = ({ onSearch }) => {
  const handleInputChange = (event) => {
    const query = event.target.value;
    onSearch(query);
  };

  const handleSearch = () => {
    // Perform search operation or additional logic if needed
    // This function can be customized as per your requirements
  };

  return (
    
      <Stack spacing={3}>
        <Stack direction="row" justifyContent="space-between" spacing={4}>

          <OutlinedInput
            onChange={handleInputChange}
            style={{ width: '300px', height: '40px',borderRadius:"30px" }}
            placeholder="Search"
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