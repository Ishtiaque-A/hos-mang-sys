import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { Box, ButtonBase } from '@mui/material';

export const SideNavItem = (props) => {
  const { active = false, disabled, external, icon, path, title } = props;

  const linkProps = path
    ? external
      ? {
        component: 'a',
        href: path,
        target: '_blank'
      }
      : {
        component: NextLink,
        href: path
      }
    : {};

  return (
    <li>
      <ButtonBase
        sx={{
          fontFamily: "system-ui",
          alignItems: 'center',
          borderRadius: 1,
          display: 'flex',
          justifyContent: 'flex-start',
          pl: '16px',
          pr: '16px',
          textAlign: 'left',
          fontSize:"5px",
          fontWeight:"500",
          
          width: '100%',
          ...(active && {
            backgroundColor: 'rgb(225, 240, 250)',
            
          }),
          '&:hover': {
            backgroundColor: 'rgb(225, 240, 250)',
            color:"rgb(0, 108, 184)"
          }
        }}
        {...linkProps}
      >
        {icon && (
          <Box
            component="span"
            sx={{
              fontFamily: "system-ui",
              fontWeight:"500",
              fontSize:"5px",
              alignItems: 'center',
              color: 'red',
              display: 'inline-flex',
              justifyContent: 'center',
              mr: 2,
              ...(active && {
                color: 'red'
              })
            }}
          >
            {icon}
          </Box>
        )}
        <Box
          component="span"
          sx={{
            fontFamily: "system-ui",
            color: '#616161',
            flexGrow: 1,
            fontSize: 12,
            fontWeight: 400,
            lineHeight: '30px',
            whiteSpace: 'nowrap',
            ...(active && {
              color:"rgb(0, 108, 184)"
            }),
            ...(disabled && {
              color: '#616161'
            })
          }}
        >
          {title}
        </Box>
      </ButtonBase>
    </li>
  );
};

SideNavItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  icon: PropTypes.node,
  path: PropTypes.string,
  title: PropTypes.string.isRequired
};
