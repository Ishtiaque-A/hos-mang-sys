import {
  IS_AUTHENTICATED,
  COMMON_MODAL_DATA_SET,
  LOADER_SHOW,
  LOADER_HIDE,
  UPDATE_IS_AUTHENTICATEED,
  TEST_DATA_UPDATE,
  SET_GLOBAL_SETTINGS,SET_VALIDITY
} from 'src/stateManagement/global/GlobalActionTypes';

const initialState = {
  isAppOpen: false,
  isAuthenticated: false,
  commonModalOn: false,
  commonModalTitle: '',
  commonModalBody: '',
  commonModalButtonText: '',
  isLoading: false,
  testData:'welcome to saas project',
  currency: '$',
  settings:{},
  organizationSettings:{},
  organization:{},
  validity:0,
};

export default function (state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case TEST_DATA_UPDATE:
      return {
        ...state,
        testData: payload.message
      }

    case IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: payload.status,
      };
    case COMMON_MODAL_DATA_SET:
      return {
        ...state,
        commonModalOn: payload.status,
        commonModalTitle: payload.title,
        commonModalBody: payload.body,
        commonModalButtonText: payload.buttonText,
      };

    case LOADER_SHOW:
      return {
        ...state,
        isLoading: true,
      };

    case LOADER_HIDE:
      return {
        ...state,
        isLoading: false,
      };

    case UPDATE_IS_AUTHENTICATEED:
      return {
        ...state,
        isAuthenticated: false,
      };

    case SET_GLOBAL_SETTINGS:
      return {
        ...state,
        currency: payload?.setting?.currency,
        settings: payload?.setting
      };
    case SET_VALIDITY:
      return {
        ...state,
        validity: payload,
      };


    default:
      return state;
  }
}
