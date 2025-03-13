import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import Link from 'next/link';
import {  logoutApiGet } from '../../common/apiCall/api';
import { setHeaders } from '../../common/apiCall/axiosSetup';
import { LOGIN_SCREEN_URL } from '../../common/constantData/screenUrl';

 export  const AccountPopover = (props) => {
  const { anchorEl, onClose, open, user } = props;
  const router = useRouter();
  const auth = useAuth();

  const handleSignOut = () => {

    logoutApiGet().then(response => {
      localStorage.removeItem("token");
      setHeaders('')
      auth.signOut()
      router.push(LOGIN_SCREEN_URL);
    }).catch((err) => {
      console.log(err)

    })
  }
  // const handleSignOut = useCallback(
  //   () => {
  //     onClose?.();
  //     auth.signOut();
  //     router.push('/auth/login');
  //   },
  //   [onClose, auth, router]
  // );

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        <Typography variant="overline">
          <Link href= "/account-settings" style={{textDecoration:"none"}}>
          Account
          </Link>
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {user?.name}
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1
          }
        }}
      >
        <MenuItem onClick={handleSignOut}>
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
