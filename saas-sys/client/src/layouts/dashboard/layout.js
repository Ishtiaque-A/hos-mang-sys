import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { styled } from '@mui/material/styles';
import { withAuthGuard } from 'src/hocs/with-auth-guard';
import  SideNav  from './side-nav';
import { TopNav } from './top-nav';
import { TopBer } from './top-ber';
import { useAuth } from "src/hooks/use-auth";
import getGlobalState from '../../stateManagement/global/globalSelector';
import getAuthState from '../../stateManagement/auth/AuthSelector';
import { connect } from 'react-redux';
import Loading from '../../components/Loading';
import * as React from 'react';

const SIDE_NAV_WIDTH = 280;
const SIDE_NAV_WIDTH2 = 20;

const LayoutRoot = styled('div')(({ theme }) => ({
  width:"100%",
  background:"",
  display: 'flex',
  flex: '1 1 auto',
  [theme.breakpoints.up('lg')]: {
    paddingLeft: SIDE_NAV_WIDTH,
    paddingRight: SIDE_NAV_WIDTH2,
  }
}));

const LayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  
});

const mapStateToProps = (state) => ({
  userProfile: getAuthState(state)?.userProfile,
});

const mapDispatchToProps = (dispatch) => ({
});
export const Layout = withAuthGuard((props) => {
  const { children } = props;
  const pathname = usePathname();
  const [openNav, setOpenNav] = useState(false);
  const [displayNav, setDisplayNav] = useState(props?.userProfile?true:false);
  const auth = useAuth();
  const router = useRouter();

  const showNav=()=>{
    setOpenNav(true);
  }

  const handlePathnameChange = useCallback(
    () => {
      if (openNav) {
        setOpenNav(false);
      }
    },
    [openNav]
  );

  useEffect(
    () => {
      handlePathnameChange();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname]
  );
  useEffect(
    () => {
      if(auth?.user?.user?.is_tem_password==1){
        router.push('/account-settings')
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  setTimeout(()=>{setDisplayNav(true)}, 3000);

  return (
    < div style={{backgroundColor: "#F6F7F7", }}>
     
      {displayNav && <TopNav onNavOpen={() => setOpenNav(true)} isAuth = {props?.userProfile} />}
      {displayNav && (<>
        <TopBer  />
        <SideNav
        onClose={() => setOpenNav(false)}
        open={openNav}
        user={auth.user}
        isAuth={props?.userProfile}
      />
      </>) }
      {!displayNav && <Loading/>}

      <LayoutRoot>
        <LayoutContainer >
          {children}
        </LayoutContainer>
      </LayoutRoot>
    </div>
  );
});

 connect(mapStateToProps, mapDispatchToProps)(Layout);
