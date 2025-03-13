import { apiDelete, apiGet, apiPost, apiPut } from "./axiosSetup";
import {
  LOGIN_URL,
  OTP_LOGIN_URL,
  SUBSCRIPTION_STORE_URL,
  SUBSCRIPTION_REQUEST_LIST,
  SUBSCRIPTION_LIST_URL,
  SUBSCRIPTION_REQUEST_STORE_URL,
  SUBSCRIPTION_REQUEST_ACCEPT_URL,
  USER_ME,
  FEATURE_STORE_URL,
  FEATURE_LIST_URL,
  FEATURE_DETAILS_URL,
  FEATURE_DELETE_URL,
  LOGOUT,
  COUPON_STORE_URL,
  COUPON_LIST_URL,
  CUPON_DELETE_URL,
  USER_LIST_URL,
  SUBSCRIPTION_PLAN_DELETE_URL,
  USER_STORE_URL,
  USER_DELETE_URL,
  OWN_DETAILS_URL,
  OWN_PROFILE_UPDATE_URL,
  OWN_PASSWORD_UPDATE_URL,
  ORGANIZATION_LIST_URL,
  ORGANIZATION_DELETE_URL,
  ORGANIZATION_STORE_URL,
  USER_ORGANIZATION_INFO,
  OWN_ORGANIZATION_INFO_UPDATE,
  STORAGE_LIST_URL,
  STORAGE_STORE_URL,
  VALIDITY_LIST_URL,
  VALIDITY_STORE_URL,
  SETTING_DETAILS_URL,
  SETTING_UPDATE_URL,
  GLOBAL_SETTING_DETAILS_URL,
  SUBSCRIPTION_PLAN_DELETE_MULTIPLE_URL,
  SUBSCRIPTION_REQUEST_DELETE_MULTIPLE_URL,
  SUBSCRIPTION_PLAN_LIST_URL,
  GOOGLE_LOGIN_URL,
  CUPON_DELETE_MULTIPLE_URL,
  SCOPS_LIST_URL,
  ACTIVITY_LIST_URL,
  ACTIVITY_DETAILS_URL,
  UPGRADEABLE_DETAILS_URL,
  UPGRADESUBSCRIPTION_URL,
  CARD_URL,
  CANCEL_URL,
  PAYMENT_SUCCESS_URL,
  REPORT_SUBSCRIPTION_PLAN_LIST_URL,
  REPORT_ORGANIZATION_PLAN_LIST_URL,
  REPORT_USERS_PLAN_LIST_URL,
  CANCEL_REQUEST_LIST_URL,
  ACCEPT_CANCEL_REQUEST_URL,
  REFUND_LIST_URL,
  REFUND_UPDATE_REQUEST_URL,
  HISTORY_LIST_URL,
  COUPON_URL,
  SUBSCRIPTION_UPGRADE_URL,
  ORGANIZATION_LIST,
  FORGET_PASSWORD_URL,
  RESET_PASSWORD_URL,
  SPECIAL_SUBSCRIPTION_PLAN_LIST_URL,
  NOTIFICATION_URL,
  DASHBORD_URL,
  REDIRECT_TOKEN,
  GET_AUTH_TOKEN,
  NOTIFICATION_SEEN_URL,
  SMS_GATEWAY_STORE_URL,
  SMS_GATEWAY_LIST_URL,
  UPDATE_SMS_GATEWAY_URL,
  PACKAGE_TRANSACTION_URL,
  GET_ALL_ORGANIZATION_FOR_BRANCH,
  BRANCH_STORE_URL,
  FETCH_BRANCH_ALL_URL,
  BRANCH_UPDATE_URL,
  BRANCH_BY_ORGANIZATION_URL,
} from "../constantData/url";

export function loginApiCall(payload) {
  return apiPost(
    LOGIN_URL,
    payload,
    {
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    },
    false
  );
}

export function otploginApiCall(payload) {
  return apiPost(
    OTP_LOGIN_URL,
    payload,
    {
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    },
    false
  );
}

export function dashboardApiCall(payload) {
  return apiGet(
    DASHBORD_URL,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false,
    false
  );
}

export function notificationApiCall(queryParam = false) {
  let url = NOTIFICATION_URL;
  if (queryParam) {
    url = NOTIFICATION_URL + "?" + queryParam;
  }
  return apiGet(
    url,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false,
    false
  );
}

export function notificationSeenApiCall(payload) {
  return apiPost(
    NOTIFICATION_SEEN_URL,
    payload,
    {
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    },
    false
  );
}

export function googleLoginApiCall(payload) {
  return apiPost(
    GOOGLE_LOGIN_URL,
    payload,
    {
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    },
    false
  );
}

export function userCreateApiCall(payload) {
  return apiPost(
    USER_STORE_URL,
    payload,
    {
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    },
    false
  );
}

export function storageCreateApiCall(payload) {
  return apiPost(
    STORAGE_STORE_URL,
    payload,
    {
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    },
    false
  );
}

export function validityCreateApiCall(payload) {
  return apiPost(
    VALIDITY_STORE_URL,
    payload,
    {
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    },
    false
  );
}

export function organizationCreateApiCall(payload) {
  return apiPost(
    ORGANIZATION_STORE_URL,
    payload,
    {
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    },
    false
  );
}

export function subscriptionCreateApiCall(payload) {
  return apiPost(
    SUBSCRIPTION_STORE_URL,
    payload,
    {
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    },
    false
  );
}

export function userUpdateApiCall(payload) {
  return apiPut(
    USER_STORE_URL,
    payload,
    {
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false
  );
}

export function storageUpdateApiCall(payload) {
  return apiPut(
    STORAGE_STORE_URL,
    payload,
    {
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false
  );
}

export function validityUpdateApiCall(payload) {
  return apiPut(
    VALIDITY_STORE_URL,
    payload,
    {
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false
  );
}

export function ownOrganizationUpdateApiCall(payload) {
  return apiPost(
    OWN_ORGANIZATION_INFO_UPDATE,
    payload,
    {
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false
  );
}

export function settingUpdateApiCall(payload) {
  return apiPost(
    SETTING_UPDATE_URL,
    payload,
    {
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false
  );
}

export function subscriptionUpdateApiCall(payload) {
  return apiPut(
    SUBSCRIPTION_STORE_URL,
    payload,
    {
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false
  );
}

export function subscriptionPlanDeleteApiCall(payload) {
  return apiGet(
    SUBSCRIPTION_PLAN_DELETE_URL + payload?.id,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false,
    false
  );
}

export function subscriptionPlanMultipleStatusChanteApiCall(payload) {
  return apiPost(
    SUBSCRIPTION_PLAN_DELETE_MULTIPLE_URL,
    payload,
    {
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false
  );
}

export function subscriptionRequestMultipleStatusChanteApiCall(payload) {
  return apiPost(
    SUBSCRIPTION_REQUEST_DELETE_MULTIPLE_URL,
    payload,
    {
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false
  );
}

export function fetchSubscriptionAPIGet(queryParam = false) {
  let url = SUBSCRIPTION_LIST_URL;
  if (queryParam) {
    url = SUBSCRIPTION_LIST_URL + "?" + queryParam;
  }
  return apiGet(
    url,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false,
    false
  );
}

export function ownProfileDetailsAPIGet(id) {
  return apiGet(
    OWN_DETAILS_URL,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false,
    false
  );
}
export function settingsDetailsAPIGet() {
  return apiGet(
    SETTING_DETAILS_URL,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false,
    false
  );
}

export function ownProfileUpdateApiCall(payload) {
  return apiPost(
    OWN_PROFILE_UPDATE_URL,
    payload,
    {
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    },
    false
  );
}

export function ownPasswordUpdateApiCall(payload) {
  return apiPost(
    OWN_PASSWORD_UPDATE_URL,
    payload,
    {
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    },
    false
  );
}

export function userDetailsAPIGet(id) {
  return apiGet(
    `v1/auth/user/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false,
    false
  );
}

export function activityDetailsAPIGet(id) {
  return apiGet(
    `v1/auth/activity/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false,
    false
  );
}

export function organizationplanADetailsPIGet(id) {
  return apiGet(
    `v1/auth/report/organization/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false,
    false
  );
}

export function storageDetailsAPIGet(id) {
  return apiGet(
    `v1/auth/storage/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false,
    false
  );
}

export function validityDetailsAPIGet(id) {
  return apiGet(
    `v1/auth/validity/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false,
    false
  );
}

export function organizationDetailsAPIGet(id) {
  return apiGet(
    `v1/auth/organization/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false,
    false
  );
}

export function fetchSubscriptionDetailsAPIGet(id) {
  return apiGet(
    `v1/auth/subscription/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false,
    false
  );
}

export function subscriptionRequestCreateApiCall(payload) {
  return apiPost(
    SUBSCRIPTION_REQUEST_STORE_URL,
    payload,
    {
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    },
    false
  );
}

export function acceptCancelRequestApiCall(payload) {
  return apiPost(
    ACCEPT_CANCEL_REQUEST_URL,
    payload,
    {
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    },
    false
  );
}

export function statusUpdateApiCall(payload) {
  return apiPost(
    REFUND_UPDATE_REQUEST_URL,
    payload,
    {
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    },
    false
  );
}

export function subscriptionAcceptApiCall(payload) {
  return apiPut(
    SUBSCRIPTION_REQUEST_ACCEPT_URL,
    payload,
    {
      timeout: 500000,
      headers: {
        "Content-Type": "application/json",
      },
    },
    false
  );
}

export function subscriptionRequestDetailsAPIGet(id) {
  return apiGet(
    `v1/auth/subscription/request/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false,
    false
  );
}

export function subscriptionRequestListAPIGet(queryParam = false) {
  let url = SUBSCRIPTION_REQUEST_LIST;
  if (queryParam) {
    url = url + "?" + queryParam;
  }
  return apiGet(
    url,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false,
    false
  );
}

export function subscriptionPlanListAPIGet() {
  return apiGet(
    SUBSCRIPTION_PLAN_LIST_URL,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false,
    false
  );
}
export function specialSubscriptionPlanListAPIGet() {
  return apiGet(
    SPECIAL_SUBSCRIPTION_PLAN_LIST_URL,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false,
    false
  );
}

export function cancelRequestDataAPIGet(id) {
  return apiGet(
    `v1/auth/subscription/cancel/request/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false,
    false
  );
}

export function refoundDetailsAPIGet(id) {
  return apiGet(
    `v1/auth/refund/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false,
    false
  );
}

export function featureCreateApiCall(payload) {
  return apiPost(
    FEATURE_STORE_URL,
    payload,
    {
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    },
    false
  );
}

export function StoreSMSGatewayCreateApiCall(payload) {
  return apiPost(
    SMS_GATEWAY_STORE_URL,
    payload,
    {
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    },
    false
  );
}

export function fetchSMSGatewayListAPIGet() {
  let url = SMS_GATEWAY_LIST_URL;
  return apiGet(
    url,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false,
    false
  );
}
export function fetchPackageTransaction() {
  let url = PACKAGE_TRANSACTION_URL;
  return apiGet(
    url,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false,
    false
  );
}

// branch api
export function fetchAllOrganization() {
  const url = GET_ALL_ORGANIZATION_FOR_BRANCH;
  return apiGet(
    url,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false,
    false
  );
}
export function fetchAllBranch(queryParam = false) {
  let url = FETCH_BRANCH_ALL_URL;
  if (queryParam) {
    url = url + "?" + queryParam;
  }
  return apiGet(
    url,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false,
    false
  );
}

export function PostBranch(payload) {
  const url = BRANCH_STORE_URL;

  return apiPost(
    url,
    payload,
    {
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false
  );
}

export function UpdateBranchAPI(payload, id) {
  console.log(id, "id");
  let url = `${BRANCH_UPDATE_URL}/${id}`;
  return apiPut(
    url,
    payload,
    {
      timeout: 30000,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
    false
  );
}

export function fetchBranchByOrganization(id) {
  let url = `${BRANCH_BY_ORGANIZATION_URL}/${id}`;
  return apiGet(
    url,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false,
    false
  );
}

export function UpdateSMSGateway(payload, id) {
  let url = `${UPDATE_SMS_GATEWAY_URL}/${id}`;
  return apiPut(
    url,
    payload,
    {
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false
  );
}

export function featurUpdateApiCall(payload) {
  return apiPut(
    FEATURE_STORE_URL,
    payload,
    {
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false
  );
}
export function featurDeleteApiCall(payload) {
  return apiPost(
    FEATURE_DELETE_URL,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false,
    false
  );
}

export function userDeleteApiCall(payload) {
  return apiPost(
    USER_DELETE_URL,
    payload,
    {
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false
  );
}

export function fetchFeatureAPIGet(queryParam = false) {
  let url = FEATURE_LIST_URL;
  if (queryParam) {
    url = FEATURE_LIST_URL + "?" + queryParam;
  }
  return apiGet(
    url,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false,
    false
  );
}

export function fetchFeatureDetailsAPIGet(id) {
  return apiGet(
    FEATURE_DETAILS_URL + id,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false,
    false
  );
}

export function fetchCouponDetailsAPIGet(id) {
  return apiGet(
    `v1/auth/coupon/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
    false,
    false
  );
}

export function fetchHistoryDetailsAPIGet(id) {
  return apiGet(
    `v1/auth/payment/history/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
    false,
    false
  );
}

export function CouponCreateApiCall(payload) {
  return apiPost(
    COUPON_STORE_URL,
    payload,
    {
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    },
    false
  );
}

export function ForgetPasswordApiCall(payload) {
  return apiPost(
    FORGET_PASSWORD_URL,
    payload,
    {
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    },
    false
  );
}

export function ResetPasswordApiCall(payload) {
  return apiPost(
    RESET_PASSWORD_URL,
    payload,
    {
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    },
    false
  );
}
export function CouponUpdateApiCall(payload) {
  return apiPut(
    COUPON_STORE_URL,
    payload,
    {
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false
  );
}

export function organizationUpdateApiCall(payload) {
  return apiPut(
    ORGANIZATION_STORE_URL,
    payload,
    {
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false
  );
}

export function cuponDeleteApiCall(payload) {
  return apiGet(
    CUPON_DELETE_URL + payload?.id,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false,
    false
  );
}
export function cuponDeleteMultipleApiCall(payload) {
  return apiPost(
    CUPON_DELETE_MULTIPLE_URL,
    payload,
    {
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    },
    false
  );
}

export function organizationDeleteApiCall(payload) {
  return apiPost(
    ORGANIZATION_DELETE_URL,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false,
    false
  );
}

export function fetchUserAPIGet(queryParam = false) {
  let url = USER_LIST_URL;
  if (queryParam) {
    url = USER_LIST_URL + "?" + queryParam;
  }
  return apiGet(
    url,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false,
    false
  );
}

export function fetchActivityAPIGet(queryParam = false) {
  console.log(queryParam, "queryParam");
  let url = ACTIVITY_LIST_URL;
  if (queryParam) {
    url = ACTIVITY_LIST_URL + "?" + queryParam;
  }
  console.log(url, "url");
  return apiGet(
    url,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false,
    false
  );
}

export function fetchSubscriptionPlanAPIGet(queryParam = false) {
  console.log(queryParam, "queryParam");
  let url = REPORT_SUBSCRIPTION_PLAN_LIST_URL;
  if (queryParam) {
    url = REPORT_SUBSCRIPTION_PLAN_LIST_URL + "?" + queryParam;
  }
  console.log(url, "url");
  return apiGet(
    url,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false,
    false
  );
}

export function fetchOrganizationPlanAPIGet(queryParam = false) {
  console.log(queryParam, "queryParam");
  let url = REPORT_ORGANIZATION_PLAN_LIST_URL;
  if (queryParam) {
    url = REPORT_ORGANIZATION_PLAN_LIST_URL + "?" + queryParam;
  }
  console.log(url, "url");
  return apiGet(
    url,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false,
    false
  );
}

export function fetchUsersPlanAPIGet(queryParam = false) {
  console.log(queryParam, "queryParam");
  let url = REPORT_USERS_PLAN_LIST_URL;
  if (queryParam) {
    url = REPORT_USERS_PLAN_LIST_URL + "?" + queryParam;
  }
  console.log(url, "url");
  return apiGet(
    url,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false,
    false
  );
}

export function fetchCancelRequestListAPIGet(queryParam = false) {
  console.log(queryParam, "queryParam");
  let url = CANCEL_REQUEST_LIST_URL;
  if (queryParam) {
    url = CANCEL_REQUEST_LIST_URL + "?" + queryParam;
  }
  console.log(url, "url");
  return apiGet(
    url,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false,
    false
  );
}

export function fetchRefundListAPIGet(queryParam = false) {
  console.log(queryParam, "queryParam");
  let url = REFUND_LIST_URL;
  if (queryParam) {
    url = REFUND_LIST_URL + "?" + queryParam;
  }
  console.log(url, "url");
  return apiGet(
    url,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false,
    false
  );
}

export function fetchStorageLimitAPIGet() {
  return apiGet(
    STORAGE_LIST_URL,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false,
    false
  );
}

export function fetchValidityLimitAPIGet() {
  return apiGet(
    VALIDITY_LIST_URL,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false,
    false
  );
}
export function fetchOrganizationGet() {
  return apiGet(
    ORGANIZATION_LIST,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false,
    false
  );
}

export function fetchUserOrganizationDetailsAPIGet() {
  return apiGet(
    USER_ORGANIZATION_INFO,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false,
    false
  );
}

export function fetchOrganizationAPIGet(queryParam = false) {
  let url = ORGANIZATION_LIST_URL;
  if (queryParam) {
    url = ORGANIZATION_LIST_URL + "?" + queryParam;
  }
  return apiGet(
    url,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false,
    false
  );
}

export function fetchScopsAPIGet() {
  let url = SCOPS_LIST_URL;

  return apiGet(
    url,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false,
    false
  );
}

export function fetchCouponAPIGet(status) {
  return apiGet(
    COUPON_LIST_URL + "?status=" + status,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false,
    false
  );
}

export function fetchHistoryAPIGet(queryParam = false) {
  let url = HISTORY_LIST_URL;
  if (queryParam) {
    url = url + "?" + queryParam;
  }
  return apiGet(
    url,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false,
    false
  );
}

export function fetchUpgradeableAPIGet() {
  return apiGet(
    UPGRADEABLE_DETAILS_URL,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    false,
    false
  );
}

export function upgradeSubscriptionApiCall(data) {
  return apiPost(
    UPGRADESUBSCRIPTION_URL,
    data,
    {
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    },
    false
  );
}

export function cardApiCall(data) {
  return apiPost(
    CARD_URL,
    data,
    {
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    },
    false
  );
}

export function cancelApiCall(data) {
  return apiPost(
    CANCEL_URL,
    data,
    {
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    },
    false
  );
}

export function couponApiCall(data) {
  return apiPost(
    COUPON_URL,
    data,
    {
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    },
    false
  );
}

export function subscriptionUpgradeApiCall(data) {
  return apiPost(
    SUBSCRIPTION_UPGRADE_URL,
    data,
    {
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    },
    false
  );
}

export function paymentSuccessApiCall(data) {
  return apiPost(
    PAYMENT_SUCCESS_URL,
    data,
    {
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    },
    false
  );
}

export function fetchUserProfileAPIGet() {
  return apiGet(
    USER_ME,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
    false,
    false
  );
}

export function fetchGlobalSettingAPIGet() {
  return apiGet(
    GLOBAL_SETTING_DETAILS_URL,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
    false,
    false
  );
}

export function logoutApiGet() {
  return apiGet(
    LOGOUT,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
    false,
    false
  );
}

export function redirectToken(data) {
  return apiPost(
    REDIRECT_TOKEN,
    data,
    {
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    },
    false
  );
}

export function getAuthToken(data) {
  return apiPost(
    GET_AUTH_TOKEN,
    data,
    {
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    },
    false
  );
}