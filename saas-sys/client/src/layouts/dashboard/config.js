import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import PresentationIcon from "@heroicons/react/24/solid/PresentationChartBarIcon";
import SquarePlus from "@heroicons/react/24/solid/SquaresPlusIcon";
import InboxStackIcon from "@heroicons/react/24/outline/InboxStackIcon";
import Ticket from "@heroicons/react/24/outline/TicketIcon";
import { SvgIcon } from "@mui/material";
import { ACCESS } from "../../common/constantData/constants";

export const items = [
  {
    access: [ACCESS.SUPER_ADMIN, ACCESS.SUPER_USER],
    title: "Dashboard",
    path: "/dashboard",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    access: [ACCESS.SUPER_ADMIN, ACCESS.SUPER_USER],
    title: "Subscription Plan",
    path: "/subscription",
    icon: (
      <SvgIcon fontSize="small">
        <PresentationIcon />
      </SvgIcon>
    ),
  },
  {
    access: [ACCESS.SUPER_ADMIN, ACCESS.SUPER_USER],
    title: "SMS Package",
    path: "/sms-package",
    icon: (
      <SvgIcon fontSize="small">
        <PresentationIcon />
      </SvgIcon>
    ),
  },
  {
    access: [ACCESS.SUPER_ADMIN, ACCESS.LOCAL_ADMIN],
    title: "Branch",
    path: "/branch",
    icon: (
      <SvgIcon fontSize="small">
        <PresentationIcon />
      </SvgIcon>
    ),
  },
  {
    access: [ACCESS.SUPER_ADMIN, ACCESS.SUPER_USER],
    title: "Storage Limit ",
    path: "/storage-limit",
    icon: (
      <SvgIcon fontSize="small">
        <PresentationIcon />
      </SvgIcon>
    ),
  },
  {
    access: [ACCESS.SUPER_ADMIN, ACCESS.SUPER_USER],
    title: "Validity ",
    path: "/validity ",
    icon: (
      <SvgIcon fontSize="small">
        <PresentationIcon />
      </SvgIcon>
    ),
  },
  {
    access: [ACCESS.SUPER_ADMIN, ACCESS.SUPER_USER],
    title: "Organization",
    path: "/organization",
    icon: (
      <SvgIcon fontSize="small">
        <PresentationIcon />
      </SvgIcon>
    ),
  },
  {
    access: [ACCESS.LOCAL_ADMIN],
    title: "Organization",
    path: "/user/own-organization/edit",
    icon: (
      <SvgIcon fontSize="small">
        <PresentationIcon />
      </SvgIcon>
    ),
  },

  {
    access: [ACCESS.SUPER_ADMIN, ACCESS.SUPER_USER],
    title: "Subscription Request",
    path: "/subscription-request",
    icon: (
      <SvgIcon fontSize="small">
        <InboxStackIcon />
      </SvgIcon>
    ),
  },
  // {
  //   access:[ACCESS.LOCAL_ADMIN],
  //   title: 'Billing & Subscriptions',
  //   path: '/billing-&-subscriptions',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <InboxStackIcon />
  //     </SvgIcon>
  //   )
  // },
  {
    access: [ACCESS.SUPER_ADMIN, ACCESS.SUPER_USER],
    title: "Coupon",
    path: "/coupon",
    icon: (
      <SvgIcon fontSize="small">
        <Ticket />
      </SvgIcon>
    ),
  },
  {
    access: [ACCESS.SUPER_ADMIN, ACCESS.SUPER_USER],
    title: "Feature",
    path: "/feature",
    icon: (
      <SvgIcon fontSize="small">
        <SquarePlus />
      </SvgIcon>
    ),
  },
  {
    access: [ACCESS.LOCAL_ADMIN, ACCESS.SUPER_USER],
    title: "Billing & Subscriptions",
    path: "/billing-&-subscriptions",
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
  },
  {
    access: [ACCESS.SUPER_ADMIN, ACCESS.LOCAL_ADMIN, ACCESS.SUPER_USER],
    title: "User",
    path: "/user",
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
  },
  {
    access: [ACCESS.SUPER_ADMIN, ACCESS.SUPER_USER],
    title: "Refund List",
    path: "/refund-list",
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
  },
  {
    access: [ACCESS.SUPER_ADMIN, ACCESS.SUPER_USER],
    title: "Cancel Request",
    path: "/cancel-request",
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
  },
  {
    access: [ACCESS.LOCAL_ADMIN],
    title: "payment History",
    path: "/history",
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
  },
];
