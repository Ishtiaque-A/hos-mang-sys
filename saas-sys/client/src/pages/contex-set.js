import { useCallback, useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import getGlobalState from "../stateManagement/global/globalSelector";
import {
  setGlobalSettingToReducer,
  setIsAuthenticated, setValidityToReducer
} from '../stateManagement/global/GlobalActionCreators';
import { connect } from "react-redux";
import { useAuth } from "src/hooks/use-auth";
import getAuthState from "../stateManagement/auth/AuthSelector";
import {
  setUserProfileToReducer
} from '../stateManagement/auth/AuthActionCreators';
import { fetchGlobalSettingAPIGet, fetchUserProfileAPIGet } from '../common/apiCall/api';
import { DASHBOARD_SCREEN_URL, LOGIN_SCREEN_URL } from '../common/constantData/screenUrl';

const mapStateToProps = (state) => ({
  isAuthenticated: getGlobalState(state)?.isAuthenticated,
  userProfile: getAuthState(state)?.userProfile,
});

const mapDispatchToProps = (dispatch) => ({
  setUserProfileToReducerProp: (data) => dispatch(setUserProfileToReducer(data)),
  setGlobalSettingToReducerProp: (data) => dispatch(setGlobalSettingToReducer(data)),
  setIsAuthenticatedProp: (data) => dispatch(setIsAuthenticated(data)),
  setValidityToReducerProp: (data) => dispatch(setValidityToReducer(data)),
});


const ContextSet = (props) => {
  const router = useRouter();
  const auth = useAuth();
  const unatuthentedUrlList = ['/subscription_request','register', '/auth/send-otp', 'send-otp', 'auth/reset-password'];
  if (typeof window !== 'undefined') {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    let value = params.token;
    if(value && value.length>10){
      localStorage.setItem("token", value);
    }
  }


  const featcSettings =()=>{

    fetchGlobalSettingAPIGet()
      .then((response)=>{
        if(response.code ==200){
          props.setGlobalSettingToReducerProp(response?.data);
        }

      })
      .catch((err=>{

      }))
  }

  const featcUserProfile =()=>{

    fetchUserProfileAPIGet()
      .then((response)=>{
        props.setUserProfileToReducerProp(response?.data);
        props.setValidityToReducerProp(response?.data?.expire_within ?? 100);
        props.setIsAuthenticatedProp({status: true});
        auth.signIn(response?.data?.user)
            .then(r => {
              // if(response?.data?.is_tem_password==1){
              //   router.push('/account-settings')
              // }
              //router.push(DASHBOARD_SCREEN_URL)
            }).catch((err)=>{
          console.log(err)
        })
    }).catch((err=>{
        auth.signOut()
        props.setUserProfileToReducerProp({});
        props.setIsAuthenticatedProp({status: false});
        let allurl =  window.location.href.split("/");
        let url = allurl[allurl.length-1].split("?")[0]

        if( !unatuthentedUrlList.includes(url)){
          router.push(LOGIN_SCREEN_URL)
        }
       //

      }))
  }



  useEffect(  ()=>{
    featcSettings();

    if (props.isAuthenticated && props?.userProfile?.name){
     auth.signIn( props.userProfile).then(()=>{
      featcSettings();
      }).catch((err)=>{
       featcUserProfile();
       featcSettings();
      })
    }else{
      featcUserProfile();
      featcSettings();
    }
  },[])


  return <></>
};

export default connect(mapStateToProps, mapDispatchToProps)(ContextSet);
