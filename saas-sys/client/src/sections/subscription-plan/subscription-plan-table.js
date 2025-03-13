import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { FEATURE_TABLE, SUBSCRIPTION_PLAN } from '../../common/constantData/language';
import {
  Box,
  Card,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";
import { PLAN_DURATION, PLAN_STORAGE } from '../../common/constantData/constants';



export const SubscriptionPlanTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  const truncateText = (text, limit) => {
    if (text.length <= limit) {
      return text;
    }
    return text.slice(0, limit) + "...";
  };




  return (
    <Card sx={{border:"1px solid #eee", borderRadius:"10px"}}>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>SL</TableCell>
                <TableCell>{SUBSCRIPTION_PLAN.MAME}</TableCell>
                <TableCell>{SUBSCRIPTION_PLAN.DURATION}</TableCell>
                <TableCell>{SUBSCRIPTION_PLAN.USER}</TableCell>
                <TableCell>{SUBSCRIPTION_PLAN.PRICE}</TableCell>
                <TableCell>{SUBSCRIPTION_PLAN.STORAGE}</TableCell>
                <TableCell>{SUBSCRIPTION_PLAN.STATUS}</TableCell>
                <TableCell>{SUBSCRIPTION_PLAN.ACTION}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((feature, index) => {
                const isSelected = selected.includes(feature.id);

                return (
                  <TableRow hover key={feature.id} selected={isSelected}>
                    <TableCell padding="checkbox">
                      {index+1}
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        {/* <Avatar src={feature.avatar}> */}
                        {getInitials(feature.name)}
                        {/* </Avatar> */}
                        <Typography variant="subtitle2">
                          {feature.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{PLAN_DURATION?.[feature.duration] ?? feature.duration+'Days'}</TableCell>
                    <TableCell>{feature.user_limit}</TableCell>
                    <TableCell>  {feature.price?feature.price:0}{props.currency}</TableCell>
                    <TableCell>{PLAN_STORAGE?.[feature.storage_limit] ?? feature.storage_limit+'MB'}</TableCell>
                    <TableCell>
                      {feature.status === "1" ? (
                        <label
                          style={{
                            background: "#62A966",
                            color: "#FFF",
                            padding: "4px",
                            paddingLeft: "10px",
                            paddingRight: "10px",
                            borderRadius: "20px ",
                          }}
                        >
                          Active
                        </label>
                      ) : (
                        <label
                          style={{
                            background: "red",
                            color: "#FFF",
                            padding: "4px",
                            paddingLeft: "10px",
                            paddingRight: "10px",
                            borderRadius: "20px ",
                          }}
                        >
                          Inactive
                        </label>
                      )}
                    </TableCell>

                    <TableCell>
                      <Link href={`feature/${feature.id}`}>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            background: "#00467a",
                            color: "white",
                            border: "",
                          }}
                        >
                          {FEATURE_TABLE.DETAILS}
                        </Button>
                      </Link>

                      <Button variant="outlined" onClick={() => props.onDelete(`${feature.id}`)}
                              sx={{marginLeft:"10px", background:"#ff9100", color:"#000000"}}
                              style={{
                                padding: "3px",
                                paddingLeft: "10px",
                                paddingRight: "10px",
                              }}>
                        Inactive
                      </Button>


                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

SubscriptionPlanTable.propTypes = {
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
