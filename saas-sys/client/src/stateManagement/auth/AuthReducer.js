import {
  AUTH_SIGNUP_DATA_STORE,
  SET_USER_PROFILE_DATA_TO_STORE,
  DELETE_USER_INFO,
  AUTH_OTP_REQUIRE,
  DEVICE_TOKEN,USER_ORGANIZATION_UPDATE
} from 'src/stateManagement/auth/AuthActionTypes';

const initialState = {
  userProfile: {},
  signupData: null,
  isOtpRequired: false,
  deviceToken: '',
  userOrganization:{}
};

export default function (state = initialState, action) {
  const {type, payload} = action;
  console.log(action)
  switch (type) {
    case SET_USER_PROFILE_DATA_TO_STORE:
      return {
        ...state,
        userProfile: payload?.user,
      };
    case AUTH_SIGNUP_DATA_STORE:
      return {
        ...state,
        signupData: payload,
      };

    case USER_ORGANIZATION_UPDATE:
      console.log('reducer',payload)
      return {
        ...state,
        userOrganization: payload.user,

      };
    case DELETE_USER_INFO:
      return {
        ...state,
        userProfile: {},
      };
    case AUTH_OTP_REQUIRE:
      return {
        ...state,
        isOtpRequired: payload,
      };
    case DEVICE_TOKEN:
      return {
        ...state,
        deviceToken: payload,
      };

    default:
      return state;
  }
}
