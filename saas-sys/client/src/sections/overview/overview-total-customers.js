import PropTypes from "prop-types";
import ArrowDownIcon from "@heroicons/react/24/solid/ArrowDownIcon";
import ArrowUpIcon from "@heroicons/react/24/solid/ArrowUpIcon";
import CurrencyDollarIcon from "@heroicons/react/24/solid/CurrencyDollarIcon";
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from "@mui/material";

import Shop2Icon from "@mui/icons-material/Shop2";

export const OverviewTotalCustomers = (props) => {
  const { difference, positive = false, sx, value } = props;

  return (
    <Card sx={{ background: "#FFFFFF", padding: "15px" }}>
      <Stack alignItems="flex-start" direction="row" justifyContent="space-between">
        <Stack>
          <div
            style={{
              backgroundColor: "#f0f0f0",
              padding: "8px 8px 8px 8px",
              borderRadius: "8px",
              width: "43px",
            }}
          >
            <div style={{ width: "2%", margin: "2%" }}>
              <SvgIcon style={{ color: "#32a852" }}>
                <Shop2Icon />
              </SvgIcon>
            </div>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", width: "250%", marginTop: "20px" }}
          >
            <Typography color="text.secondary" variant="overline">
            New Purchases
            </Typography>
            <div style={{ width: "90%" }}>
              <Typography variant="h5">{value}</Typography>
            </div>
          </div>
        </Stack>
      </Stack>
    </Card>

    
  );
};

OverviewTotalCustomers.propTypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  value: PropTypes.string.isRequired,
  sx: PropTypes.object,
};
