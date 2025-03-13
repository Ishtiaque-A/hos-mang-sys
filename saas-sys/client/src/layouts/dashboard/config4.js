import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import MapIcon from '@heroicons/react/24/solid/MapIcon';
import PresentationIcon from '@heroicons/react/24/solid/PresentationChartBarIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import SquarePlus from '@heroicons/react/24/solid/SquaresPlusIcon';
import Banknotes from '@heroicons/react/24/outline/BanknotesIcon';
import InboxStackIcon from '@heroicons/react/24/outline/InboxStackIcon';
import Ticket from '@heroicons/react/24/outline/TicketIcon';
import { SvgIcon } from '@mui/material';
import { ACCESS } from '../../common/constantData/constants';

export const items4 = [
  {
    access:[ACCESS.SUPER_ADMIN, ACCESS.LOCAL_ADMIN, ACCESS.SUPER_USER],
    title: 'Audit',
    path: '/audit',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    access:[ACCESS.SUPER_ADMIN, ACCESS.SUPER_USER],
    title: 'Subscription plan',
    path: '/reports/subscription-plan',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },

  {
    access:[ACCESS.SUPER_ADMIN, ACCESS.SUPER_USER],
    title: 'Organizations',
    path: '/reports/organization',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    access:[ACCESS.SUPER_ADMIN, ACCESS.SUPER_USER],
    title: 'Users ',
    path: '/users-plan',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },


];
