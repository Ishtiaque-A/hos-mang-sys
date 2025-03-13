"use strict";
exports.id = 2544;
exports.ids = [2544];
exports.modules = {

/***/ 5110:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $c: () => (/* binding */ CouponCreateApiCall),
/* harmony export */   AH: () => (/* binding */ userDetailsAPIGet),
/* harmony export */   AM: () => (/* binding */ fetchUpgradeableAPIGet),
/* harmony export */   B3: () => (/* binding */ fetchCouponAPIGet),
/* harmony export */   Bb: () => (/* binding */ userDeleteApiCall),
/* harmony export */   C: () => (/* binding */ storageCreateApiCall),
/* harmony export */   Ci: () => (/* binding */ subscriptionPlanDeleteApiCall),
/* harmony export */   DR: () => (/* binding */ subscriptionUpgradeApiCall),
/* harmony export */   Di: () => (/* binding */ fetchActivityAPIGet),
/* harmony export */   El: () => (/* binding */ subscriptionRequestDetailsAPIGet),
/* harmony export */   GR: () => (/* binding */ userUpdateApiCall),
/* harmony export */   Gj: () => (/* binding */ otploginApiCall),
/* harmony export */   Gl: () => (/* binding */ fetchScopsAPIGet),
/* harmony export */   HA: () => (/* binding */ subscriptionPlanMultipleStatusChanteApiCall),
/* harmony export */   IK: () => (/* binding */ fetchCancelRequestListAPIGet),
/* harmony export */   IW: () => (/* binding */ fetchOrganizationAPIGet),
/* harmony export */   Iq: () => (/* binding */ featurDeleteApiCall),
/* harmony export */   Iu: () => (/* binding */ fetchValidityLimitAPIGet),
/* harmony export */   JG: () => (/* binding */ ForgetPasswordApiCall),
/* harmony export */   JK: () => (/* binding */ statusUpdateApiCall),
/* harmony export */   KF: () => (/* binding */ ownProfileDetailsAPIGet),
/* harmony export */   Kv: () => (/* binding */ fetchUsersPlanAPIGet),
/* harmony export */   L1: () => (/* binding */ storageUpdateApiCall),
/* harmony export */   OK: () => (/* binding */ subscriptionRequestMultipleStatusChanteApiCall),
/* harmony export */   P6: () => (/* binding */ fetchSubscriptionPlanAPIGet),
/* harmony export */   PB: () => (/* binding */ ownOrganizationUpdateApiCall),
/* harmony export */   PY: () => (/* binding */ fetchStorageLimitAPIGet),
/* harmony export */   Q1: () => (/* binding */ fetchOrganizationPlanAPIGet),
/* harmony export */   QL: () => (/* binding */ settingsDetailsAPIGet),
/* harmony export */   Qb: () => (/* binding */ organizationDetailsAPIGet),
/* harmony export */   Qz: () => (/* binding */ organizationUpdateApiCall),
/* harmony export */   R0: () => (/* binding */ organizationCreateApiCall),
/* harmony export */   RK: () => (/* binding */ validityCreateApiCall),
/* harmony export */   S8: () => (/* binding */ cancelRequestDataAPIGet),
/* harmony export */   SS: () => (/* binding */ subscriptionCreateApiCall),
/* harmony export */   TE: () => (/* binding */ featurUpdateApiCall),
/* harmony export */   TF: () => (/* binding */ validityUpdateApiCall),
/* harmony export */   Th: () => (/* binding */ fetchSubscriptionDetailsAPIGet),
/* harmony export */   UO: () => (/* binding */ cancelApiCall),
/* harmony export */   Um: () => (/* binding */ ownPasswordUpdateApiCall),
/* harmony export */   VU: () => (/* binding */ organizationDeleteApiCall),
/* harmony export */   Wj: () => (/* binding */ loginApiCall),
/* harmony export */   Xj: () => (/* binding */ fetchSubscriptionAPIGet),
/* harmony export */   Xu: () => (/* binding */ logoutApiGet),
/* harmony export */   YT: () => (/* binding */ acceptCancelRequestApiCall),
/* harmony export */   Z2: () => (/* binding */ fetchAllOrganization),
/* harmony export */   ZV: () => (/* binding */ StoreSMSGatewayCreateApiCall),
/* harmony export */   Zq: () => (/* binding */ notificationApiCall),
/* harmony export */   _C: () => (/* binding */ ownProfileUpdateApiCall),
/* harmony export */   _D: () => (/* binding */ fetchOrganizationGet),
/* harmony export */   _p: () => (/* binding */ activityDetailsAPIGet),
/* harmony export */   bW: () => (/* binding */ getAuthToken),
/* harmony export */   bq: () => (/* binding */ subscriptionRequestListAPIGet),
/* harmony export */   cr: () => (/* binding */ fetchHistoryAPIGet),
/* harmony export */   dG: () => (/* binding */ featureCreateApiCall),
/* harmony export */   db: () => (/* binding */ validityDetailsAPIGet),
/* harmony export */   dm: () => (/* binding */ fetchHistoryDetailsAPIGet),
/* harmony export */   eK: () => (/* binding */ fetchFeatureAPIGet),
/* harmony export */   f1: () => (/* binding */ fetchRefundListAPIGet),
/* harmony export */   fO: () => (/* binding */ cuponDeleteMultipleApiCall),
/* harmony export */   g2: () => (/* binding */ fetchUserAPIGet),
/* harmony export */   hV: () => (/* binding */ subscriptionRequestCreateApiCall),
/* harmony export */   iB: () => (/* binding */ refoundDetailsAPIGet),
/* harmony export */   iD: () => (/* binding */ paymentSuccessApiCall),
/* harmony export */   iJ: () => (/* binding */ ResetPasswordApiCall),
/* harmony export */   k2: () => (/* binding */ fetchPackageTransaction),
/* harmony export */   kH: () => (/* binding */ googleLoginApiCall),
/* harmony export */   kl: () => (/* binding */ CouponUpdateApiCall),
/* harmony export */   lw: () => (/* binding */ subscriptionUpdateApiCall),
/* harmony export */   m1: () => (/* binding */ subscriptionPlanListAPIGet),
/* harmony export */   mA: () => (/* binding */ notificationSeenApiCall),
/* harmony export */   n6: () => (/* binding */ subscriptionAcceptApiCall),
/* harmony export */   nE: () => (/* binding */ dashboardApiCall),
/* harmony export */   o6: () => (/* binding */ settingUpdateApiCall),
/* harmony export */   pf: () => (/* binding */ fetchCouponDetailsAPIGet),
/* harmony export */   pk: () => (/* binding */ fetchUserOrganizationDetailsAPIGet),
/* harmony export */   q8: () => (/* binding */ storageDetailsAPIGet),
/* harmony export */   qr: () => (/* binding */ organizationplanADetailsPIGet),
/* harmony export */   rw: () => (/* binding */ specialSubscriptionPlanListAPIGet),
/* harmony export */   s6: () => (/* binding */ fetchUserProfileAPIGet),
/* harmony export */   tJ: () => (/* binding */ fetchGlobalSettingAPIGet),
/* harmony export */   tx: () => (/* binding */ couponApiCall),
/* harmony export */   uY: () => (/* binding */ fetchFeatureDetailsAPIGet),
/* harmony export */   v1: () => (/* binding */ UpdateBranchAPI),
/* harmony export */   vy: () => (/* binding */ userCreateApiCall),
/* harmony export */   wZ: () => (/* binding */ fetchSMSGatewayListAPIGet),
/* harmony export */   xM: () => (/* binding */ redirectToken),
/* harmony export */   yg: () => (/* binding */ UpdateSMSGateway),
/* harmony export */   yx: () => (/* binding */ fetchAllBranch),
/* harmony export */   z: () => (/* binding */ fetchBranchByOrganization),
/* harmony export */   zK: () => (/* binding */ PostBranch)
/* harmony export */ });
/* unused harmony exports cuponDeleteApiCall, upgradeSubscriptionApiCall, cardApiCall */
/* harmony import */ var _axiosSetup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4446);
/* harmony import */ var _constantData_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2128);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_axiosSetup__WEBPACK_IMPORTED_MODULE_0__]);
_axiosSetup__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


function loginApiCall(payload) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiPost */ .sg)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .LOGIN_URL */ .ZE, payload, {
        timeout: 30000,
        headers: {
            "Content-Type": "application/json"
        }
    }, false);
}
function otploginApiCall(payload) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiPost */ .sg)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .OTP_LOGIN_URL */ .Wy, payload, {
        timeout: 30000,
        headers: {
            "Content-Type": "application/json"
        }
    }, false);
}
function dashboardApiCall(payload) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiGet */ .R1)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .DASHBORD_URL */ .BU, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false, false);
}
function notificationApiCall(queryParam = false) {
    let url = _constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .NOTIFICATION_URL */ .tg;
    if (queryParam) {
        url = _constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .NOTIFICATION_URL */ .tg + "?" + queryParam;
    }
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiGet */ .R1)(url, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false, false);
}
function notificationSeenApiCall(payload) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiPost */ .sg)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .NOTIFICATION_SEEN_URL */ .rX, payload, {
        timeout: 30000,
        headers: {
            "Content-Type": "application/json"
        }
    }, false);
}
function googleLoginApiCall(payload) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiPost */ .sg)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .GOOGLE_LOGIN_URL */ .K0, payload, {
        timeout: 30000,
        headers: {
            "Content-Type": "application/json"
        }
    }, false);
}
function userCreateApiCall(payload) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiPost */ .sg)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .USER_STORE_URL */ .fi, payload, {
        timeout: 30000,
        headers: {
            "Content-Type": "application/json"
        }
    }, false);
}
function storageCreateApiCall(payload) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiPost */ .sg)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .STORAGE_STORE_URL */ .p5, payload, {
        timeout: 30000,
        headers: {
            "Content-Type": "application/json"
        }
    }, false);
}
function validityCreateApiCall(payload) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiPost */ .sg)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .VALIDITY_STORE_URL */ .jX, payload, {
        timeout: 30000,
        headers: {
            "Content-Type": "application/json"
        }
    }, false);
}
function organizationCreateApiCall(payload) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiPost */ .sg)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .ORGANIZATION_STORE_URL */ .Iq, payload, {
        timeout: 30000,
        headers: {
            "Content-Type": "application/json"
        }
    }, false);
}
function subscriptionCreateApiCall(payload) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiPost */ .sg)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .SUBSCRIPTION_STORE_URL */ .YJ, payload, {
        timeout: 30000,
        headers: {
            "Content-Type": "application/json"
        }
    }, false);
}
function userUpdateApiCall(payload) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiPut */ .pE)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .USER_STORE_URL */ .fi, payload, {
        timeout: 30000,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false);
}
function storageUpdateApiCall(payload) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiPut */ .pE)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .STORAGE_STORE_URL */ .p5, payload, {
        timeout: 30000,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false);
}
function validityUpdateApiCall(payload) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiPut */ .pE)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .VALIDITY_STORE_URL */ .jX, payload, {
        timeout: 30000,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false);
}
function ownOrganizationUpdateApiCall(payload) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiPost */ .sg)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .OWN_ORGANIZATION_INFO_UPDATE */ .jw, payload, {
        timeout: 30000,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false);
}
function settingUpdateApiCall(payload) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiPost */ .sg)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .SETTING_UPDATE_URL */ .ZL, payload, {
        timeout: 30000,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false);
}
function subscriptionUpdateApiCall(payload) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiPut */ .pE)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .SUBSCRIPTION_STORE_URL */ .YJ, payload, {
        timeout: 30000,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false);
}
function subscriptionPlanDeleteApiCall(payload) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiGet */ .R1)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .SUBSCRIPTION_PLAN_DELETE_URL */ .XT + payload?.id, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false, false);
}
function subscriptionPlanMultipleStatusChanteApiCall(payload) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiPost */ .sg)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .SUBSCRIPTION_PLAN_DELETE_MULTIPLE_URL */ .fI, payload, {
        timeout: 30000,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false);
}
function subscriptionRequestMultipleStatusChanteApiCall(payload) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiPost */ .sg)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .SUBSCRIPTION_REQUEST_DELETE_MULTIPLE_URL */ .o2, payload, {
        timeout: 30000,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false);
}
function fetchSubscriptionAPIGet(queryParam = false) {
    let url = _constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .SUBSCRIPTION_LIST_URL */ .MX;
    if (queryParam) {
        url = _constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .SUBSCRIPTION_LIST_URL */ .MX + "?" + queryParam;
    }
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiGet */ .R1)(url, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false, false);
}
function ownProfileDetailsAPIGet(id) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiGet */ .R1)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .OWN_DETAILS_URL */ .Nr, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false, false);
}
function settingsDetailsAPIGet() {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiGet */ .R1)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .SETTING_DETAILS_URL */ .yd, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false, false);
}
function ownProfileUpdateApiCall(payload) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiPost */ .sg)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .OWN_PROFILE_UPDATE_URL */ .uc, payload, {
        timeout: 30000,
        headers: {
            "Content-Type": "application/json"
        }
    }, false);
}
function ownPasswordUpdateApiCall(payload) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiPost */ .sg)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .OWN_PASSWORD_UPDATE_URL */ ._r, payload, {
        timeout: 30000,
        headers: {
            "Content-Type": "application/json"
        }
    }, false);
}
function userDetailsAPIGet(id) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiGet */ .R1)(`v1/auth/user/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false, false);
}
function activityDetailsAPIGet(id) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiGet */ .R1)(`v1/auth/activity/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false, false);
}
function organizationplanADetailsPIGet(id) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiGet */ .R1)(`v1/auth/report/organization/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false, false);
}
function storageDetailsAPIGet(id) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiGet */ .R1)(`v1/auth/storage/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false, false);
}
function validityDetailsAPIGet(id) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiGet */ .R1)(`v1/auth/validity/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false, false);
}
function organizationDetailsAPIGet(id) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiGet */ .R1)(`v1/auth/organization/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false, false);
}
function fetchSubscriptionDetailsAPIGet(id) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiGet */ .R1)(`v1/auth/subscription/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false, false);
}
function subscriptionRequestCreateApiCall(payload) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiPost */ .sg)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .SUBSCRIPTION_REQUEST_STORE_URL */ .yR, payload, {
        timeout: 30000,
        headers: {
            "Content-Type": "application/json"
        }
    }, false);
}
function acceptCancelRequestApiCall(payload) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiPost */ .sg)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .ACCEPT_CANCEL_REQUEST_URL */ .kE, payload, {
        timeout: 30000,
        headers: {
            "Content-Type": "application/json"
        }
    }, false);
}
function statusUpdateApiCall(payload) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiPost */ .sg)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .REFUND_UPDATE_REQUEST_URL */ .zW, payload, {
        timeout: 30000,
        headers: {
            "Content-Type": "application/json"
        }
    }, false);
}
function subscriptionAcceptApiCall(payload) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiPut */ .pE)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .SUBSCRIPTION_REQUEST_ACCEPT_URL */ .dd, payload, {
        timeout: 500000,
        headers: {
            "Content-Type": "application/json"
        }
    }, false);
}
function subscriptionRequestDetailsAPIGet(id) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiGet */ .R1)(`v1/auth/subscription/request/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false, false);
}
function subscriptionRequestListAPIGet(queryParam = false) {
    let url = _constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .SUBSCRIPTION_REQUEST_LIST */ .vY;
    if (queryParam) {
        url = url + "?" + queryParam;
    }
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiGet */ .R1)(url, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false, false);
}
function subscriptionPlanListAPIGet() {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiGet */ .R1)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .SUBSCRIPTION_PLAN_LIST_URL */ .Xv, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false, false);
}
function specialSubscriptionPlanListAPIGet() {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiGet */ .R1)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .SPECIAL_SUBSCRIPTION_PLAN_LIST_URL */ .E6, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false, false);
}
function cancelRequestDataAPIGet(id) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiGet */ .R1)(`v1/auth/subscription/cancel/request/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false, false);
}
function refoundDetailsAPIGet(id) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiGet */ .R1)(`v1/auth/refund/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false, false);
}
function featureCreateApiCall(payload) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiPost */ .sg)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .FEATURE_STORE_URL */ .tJ, payload, {
        timeout: 30000,
        headers: {
            "Content-Type": "application/json"
        }
    }, false);
}
function StoreSMSGatewayCreateApiCall(payload) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiPost */ .sg)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .SMS_GATEWAY_STORE_URL */ .Zk, payload, {
        timeout: 30000,
        headers: {
            "Content-Type": "application/json"
        }
    }, false);
}
function fetchSMSGatewayListAPIGet() {
    let url = _constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .SMS_GATEWAY_LIST_URL */ .Ix;
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiGet */ .R1)(url, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false, false);
}
function fetchPackageTransaction() {
    let url = _constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .PACKAGE_TRANSACTION_URL */ .xj;
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiGet */ .R1)(url, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false, false);
}
// branch api
function fetchAllOrganization() {
    const url = _constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .GET_ALL_ORGANIZATION_FOR_BRANCH */ .b9;
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiGet */ .R1)(url, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false, false);
}
function fetchAllBranch(queryParam = false) {
    let url = _constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .FETCH_BRANCH_ALL_URL */ .jb;
    if (queryParam) {
        url = url + "?" + queryParam;
    }
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiGet */ .R1)(url, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false, false);
}
function PostBranch(payload) {
    const url = _constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .BRANCH_STORE_URL */ .gS;
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiPost */ .sg)(url, payload, {
        timeout: 30000,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false);
}
function UpdateBranchAPI(payload, id) {
    console.log(id, "id");
    let url = `${_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .BRANCH_UPDATE_URL */ .HR}/${id}`;
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiPut */ .pE)(url, payload, {
        timeout: 30000,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    }, false);
}
function fetchBranchByOrganization(id) {
    let url = `${_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .BRANCH_BY_ORGANIZATION_URL */ .IS}/${id}`;
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiGet */ .R1)(url, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false, false);
}
function UpdateSMSGateway(payload, id) {
    let url = `${_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .UPDATE_SMS_GATEWAY_URL */ .fL}/${id}`;
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiPut */ .pE)(url, payload, {
        timeout: 30000,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false);
}
function featurUpdateApiCall(payload) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiPut */ .pE)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .FEATURE_STORE_URL */ .tJ, payload, {
        timeout: 30000,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false);
}
function featurDeleteApiCall(payload) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiPost */ .sg)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .FEATURE_DELETE_URL */ .Am, payload, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false, false);
}
function userDeleteApiCall(payload) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiPost */ .sg)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .USER_DELETE_URL */ .wD, payload, {
        timeout: 30000,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false);
}
function fetchFeatureAPIGet(queryParam = false) {
    let url = _constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .FEATURE_LIST_URL */ .Jb;
    if (queryParam) {
        url = _constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .FEATURE_LIST_URL */ .Jb + "?" + queryParam;
    }
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiGet */ .R1)(url, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false, false);
}
function fetchFeatureDetailsAPIGet(id) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiGet */ .R1)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .FEATURE_DETAILS_URL */ .Cb + id, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false, false);
}
function fetchCouponDetailsAPIGet(id) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiGet */ .R1)(`v1/auth/coupon/${id}`, {
        headers: {
            "Content-Type": "application/json"
        }
    }, false, false);
}
function fetchHistoryDetailsAPIGet(id) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiGet */ .R1)(`v1/auth/payment/history/${id}`, {
        headers: {
            "Content-Type": "application/json"
        }
    }, false, false);
}
function CouponCreateApiCall(payload) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiPost */ .sg)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .COUPON_STORE_URL */ .JE, payload, {
        timeout: 30000,
        headers: {
            "Content-Type": "application/json"
        }
    }, false);
}
function ForgetPasswordApiCall(payload) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiPost */ .sg)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .FORGET_PASSWORD_URL */ .M_, payload, {
        timeout: 30000,
        headers: {
            "Content-Type": "application/json"
        }
    }, false);
}
function ResetPasswordApiCall(payload) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiPost */ .sg)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .RESET_PASSWORD_URL */ .FJ, payload, {
        timeout: 30000,
        headers: {
            "Content-Type": "application/json"
        }
    }, false);
}
function CouponUpdateApiCall(payload) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiPut */ .pE)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .COUPON_STORE_URL */ .JE, payload, {
        timeout: 30000,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false);
}
function organizationUpdateApiCall(payload) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiPut */ .pE)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .ORGANIZATION_STORE_URL */ .Iq, payload, {
        timeout: 30000,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false);
}
function cuponDeleteApiCall(payload) {
    return apiGet(CUPON_DELETE_URL + payload?.id, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false, false);
}
function cuponDeleteMultipleApiCall(payload) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiPost */ .sg)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .CUPON_DELETE_MULTIPLE_URL */ .Ib, payload, {
        timeout: 30000,
        headers: {
            "Content-Type": "application/json"
        }
    }, false);
}
function organizationDeleteApiCall(payload) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiPost */ .sg)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .ORGANIZATION_DELETE_URL */ .UH, payload, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false, false);
}
function fetchUserAPIGet(queryParam = false) {
    let url = _constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .USER_LIST_URL */ ._H;
    if (queryParam) {
        url = _constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .USER_LIST_URL */ ._H + "?" + queryParam;
    }
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiGet */ .R1)(url, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false, false);
}
function fetchActivityAPIGet(queryParam = false) {
    console.log(queryParam, "queryParam");
    let url = _constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .ACTIVITY_LIST_URL */ .h9;
    if (queryParam) {
        url = _constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .ACTIVITY_LIST_URL */ .h9 + "?" + queryParam;
    }
    console.log(url, "url");
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiGet */ .R1)(url, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false, false);
}
function fetchSubscriptionPlanAPIGet(queryParam = false) {
    console.log(queryParam, "queryParam");
    let url = _constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .REPORT_SUBSCRIPTION_PLAN_LIST_URL */ .mi;
    if (queryParam) {
        url = _constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .REPORT_SUBSCRIPTION_PLAN_LIST_URL */ .mi + "?" + queryParam;
    }
    console.log(url, "url");
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiGet */ .R1)(url, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false, false);
}
function fetchOrganizationPlanAPIGet(queryParam = false) {
    console.log(queryParam, "queryParam");
    let url = _constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .REPORT_ORGANIZATION_PLAN_LIST_URL */ .uO;
    if (queryParam) {
        url = _constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .REPORT_ORGANIZATION_PLAN_LIST_URL */ .uO + "?" + queryParam;
    }
    console.log(url, "url");
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiGet */ .R1)(url, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false, false);
}
function fetchUsersPlanAPIGet(queryParam = false) {
    console.log(queryParam, "queryParam");
    let url = _constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .REPORT_USERS_PLAN_LIST_URL */ .FO;
    if (queryParam) {
        url = _constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .REPORT_USERS_PLAN_LIST_URL */ .FO + "?" + queryParam;
    }
    console.log(url, "url");
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiGet */ .R1)(url, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false, false);
}
function fetchCancelRequestListAPIGet(queryParam = false) {
    console.log(queryParam, "queryParam");
    let url = _constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .CANCEL_REQUEST_LIST_URL */ .Z8;
    if (queryParam) {
        url = _constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .CANCEL_REQUEST_LIST_URL */ .Z8 + "?" + queryParam;
    }
    console.log(url, "url");
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiGet */ .R1)(url, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false, false);
}
function fetchRefundListAPIGet(queryParam = false) {
    console.log(queryParam, "queryParam");
    let url = _constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .REFUND_LIST_URL */ .rM;
    if (queryParam) {
        url = _constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .REFUND_LIST_URL */ .rM + "?" + queryParam;
    }
    console.log(url, "url");
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiGet */ .R1)(url, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false, false);
}
function fetchStorageLimitAPIGet() {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiGet */ .R1)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .STORAGE_LIST_URL */ .cJ, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false, false);
}
function fetchValidityLimitAPIGet() {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiGet */ .R1)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .VALIDITY_LIST_URL */ .Cl, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false, false);
}
function fetchOrganizationGet() {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiGet */ .R1)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .ORGANIZATION_LIST */ .ZX, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false, false);
}
function fetchUserOrganizationDetailsAPIGet() {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiGet */ .R1)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .USER_ORGANIZATION_INFO */ .ND, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false, false);
}
function fetchOrganizationAPIGet(queryParam = false) {
    let url = _constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .ORGANIZATION_LIST_URL */ ._f;
    if (queryParam) {
        url = _constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .ORGANIZATION_LIST_URL */ ._f + "?" + queryParam;
    }
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiGet */ .R1)(url, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false, false);
}
function fetchScopsAPIGet() {
    let url = _constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .SCOPS_LIST_URL */ .w8;
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiGet */ .R1)(url, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false, false);
}
function fetchCouponAPIGet(status) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiGet */ .R1)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .COUPON_LIST_URL */ .jo + "?status=" + status, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false, false);
}
function fetchHistoryAPIGet(queryParam = false) {
    let url = _constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .HISTORY_LIST_URL */ .D0;
    if (queryParam) {
        url = url + "?" + queryParam;
    }
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiGet */ .R1)(url, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false, false);
}
function fetchUpgradeableAPIGet() {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiGet */ .R1)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .UPGRADEABLE_DETAILS_URL */ .Y0, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }, false, false);
}
function upgradeSubscriptionApiCall(data) {
    return apiPost(UPGRADESUBSCRIPTION_URL, data, {
        timeout: 30000,
        headers: {
            "Content-Type": "application/json"
        }
    }, false);
}
function cardApiCall(data) {
    return apiPost(CARD_URL, data, {
        timeout: 30000,
        headers: {
            "Content-Type": "application/json"
        }
    }, false);
}
function cancelApiCall(data) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiPost */ .sg)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .CANCEL_URL */ .H2, data, {
        timeout: 30000,
        headers: {
            "Content-Type": "application/json"
        }
    }, false);
}
function couponApiCall(data) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiPost */ .sg)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .COUPON_URL */ .YX, data, {
        timeout: 30000,
        headers: {
            "Content-Type": "application/json"
        }
    }, false);
}
function subscriptionUpgradeApiCall(data) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiPost */ .sg)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .SUBSCRIPTION_UPGRADE_URL */ .vD, data, {
        timeout: 30000,
        headers: {
            "Content-Type": "application/json"
        }
    }, false);
}
function paymentSuccessApiCall(data) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiPost */ .sg)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .PAYMENT_SUCCESS_URL */ .Kf, data, {
        timeout: 30000,
        headers: {
            "Content-Type": "application/json"
        }
    }, false);
}
function fetchUserProfileAPIGet() {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiGet */ .R1)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .USER_ME */ .tk, {
        headers: {
            "Content-Type": "application/json"
        }
    }, false, false);
}
function fetchGlobalSettingAPIGet() {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiGet */ .R1)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .GLOBAL_SETTING_DETAILS_URL */ .CT, {
        headers: {
            "Content-Type": "application/json"
        }
    }, false, false);
}
function logoutApiGet() {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiGet */ .R1)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .LOGOUT */ .Nv, {
        headers: {
            "Content-Type": "application/json"
        }
    }, false, false);
}
function redirectToken(data) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiPost */ .sg)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .REDIRECT_TOKEN */ .s6, data, {
        timeout: 30000,
        headers: {
            "Content-Type": "application/json"
        }
    }, false);
}
function getAuthToken(data) {
    return (0,_axiosSetup__WEBPACK_IMPORTED_MODULE_0__/* .apiPost */ .sg)(_constantData_url__WEBPACK_IMPORTED_MODULE_1__/* .GET_AUTH_TOKEN */ .qX, data, {
        timeout: 30000,
        headers: {
            "Content-Type": "application/json"
        }
    }, false);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4446:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FU: () => (/* binding */ setHeaders),
/* harmony export */   R1: () => (/* binding */ apiGet),
/* harmony export */   pE: () => (/* binding */ apiPut),
/* harmony export */   sg: () => (/* binding */ apiPost)
/* harmony export */ });
/* unused harmony exports fetchReverseGeoCode, apiGetFromExternalServer, fetchRequest, handleFetchErrors, apiDelete */
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7104);
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(qs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios_retry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3617);
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5944);
/* harmony import */ var _constantData_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2021);
/* harmony import */ var _exceptions_AxiosError__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4532);
/* harmony import */ var _exceptions_GeneralError__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2247);
/* harmony import */ var _constantData_url__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2128);
/* harmony import */ var _stateManagement_global_globalSelector__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(15);
/* harmony import */ var _stateManagement_Store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9312);
/* harmony import */ var _stateManagement_global_GlobalActionCreators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(4005);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios_retry__WEBPACK_IMPORTED_MODULE_1__, _stateManagement_Store__WEBPACK_IMPORTED_MODULE_3__]);
([axios_retry__WEBPACK_IMPORTED_MODULE_1__, _stateManagement_Store__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);










const axios = __webpack_require__(2167);
const axiosInstance = axios.create();
axios.defaults.timeout = 300000;
axiosInstance.defaults.timeout = 300000;
axios.defaults.headers.common.Accept = "application/json";
axiosInstance.defaults.headers.common.Accept = "application/json";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axiosInstance.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
// disable cache
axiosInstance.defaults.headers.common["Cache-Control"] = "no-cache";
axiosInstance.defaults.headers.common.Pragma = "no-cache";
axiosInstance.defaults.headers.common.Expires = "0";
/** Api Mocking start */ const MockAdapter = __webpack_require__(6963);
const mock = new MockAdapter(axiosInstance, {
    delayResponse: 2000
});
mock.onPut("/private/v2/users/fullName").reply(201, {
    status: 200,
    statusText: "Successful"
});
mock.onPut("/private/v2/users/loginUpdate").reply(201, {
    status: 200,
    statusText: "Successful"
});
function setHeaders(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}
/** Api Mocking ends */ function transformConfig(config, data) {
    let transformedData = data;
    if (config && (0,_utilities__WEBPACK_IMPORTED_MODULE_4__/* .isDefined */ .$K)(config, "headers") && (0,_utilities__WEBPACK_IMPORTED_MODULE_4__/* .isDefined */ .$K)(config.headers, "Content-Type") && config.headers["Content-Type"] === "application/x-www-form-urlencoded") {
        transformedData = (0,qs__WEBPACK_IMPORTED_MODULE_0__.stringify)(data);
    }
    return transformedData;
}
function handleFetchErrors(response) {
    if (!response.ok) {
        throw new AxiosError(response.statusText);
    }
    return response;
}
async function headerConfiguration(url, config, token = null) {
    console.log(url);
    if (url !== _constantData_url__WEBPACK_IMPORTED_MODULE_5__/* .LOGIN_URL */ .ZE && url !== _constantData_url__WEBPACK_IMPORTED_MODULE_5__/* .SIGNUP_URL */ .iG) {
        //TODO: set access token
        token = token ? token : await localStorage.getItem("token");
        let authToken = `Bearer ${token}`;
        if (!axios.defaults.headers.common.Authorization) {
            axios.defaults.headers.common.Authorization = authToken;
            config.headers.Authorization = authToken;
        }
    }
    //console.log(config.headers, axios.defaults.headers.common)
    return new Promise((resolve)=>{
        resolve(config);
    });
}
/** Axios catch block handler */ const errorHandler = (error)=>{
    if (error.response) {
        const { response } = error;
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("full response: ", response);
        if (response.status === 500) {
            throw new _exceptions_GeneralError__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z("Opps! There was a problem. Please try again later.", 500);
        }
        if ((0,_utilities__WEBPACK_IMPORTED_MODULE_4__/* .isDefined */ .$K)(response, "data")) {
            if ((0,_utilities__WEBPACK_IMPORTED_MODULE_4__/* .isDefined */ .$K)(response.data, "message")) {
                throw new _exceptions_AxiosError__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z(response.data.message, response.status);
            }
            if ((0,_utilities__WEBPACK_IMPORTED_MODULE_4__/* .isDefined */ .$K)(response.data, "errors") && Array.isArray(response.data.errors)) {
                throw new _exceptions_AxiosError__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z(response.data.errors, response.status);
            }
            if ((0,_utilities__WEBPACK_IMPORTED_MODULE_4__/* .isDefined */ .$K)(response.data, "errors")) {
                throw new _exceptions_AxiosError__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z(response.data.errors, response.status);
            } else {
                console.log("Error else");
                throw new _exceptions_AxiosError__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z(response.config, response.status);
            }
        }
        throw new _exceptions_GeneralError__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z("Opps! There was a problem. Please try again later.", response.status);
    }
    if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log("full request (Net Problem): ", error.request);
        console.log("full error (Net Problem): ", error.toJSON());
        const { isConnectedToInternet } = (0,_stateManagement_global_globalSelector__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z)(_stateManagement_Store__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z.getState());
        if (isConnectedToInternet) {
            _stateManagement_Store__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z.dispatch((0,_stateManagement_global_GlobalActionCreators__WEBPACK_IMPORTED_MODULE_9__/* .commonModalDataSet */ .Jx)({
                status: true,
                title: "Service Interruption",
                body: "We will get back shortly! Stay tune!",
                buttonText: "Dismiss!"
            }));
        }
        throw new _exceptions_GeneralError__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z("SERVER_DOWN", 99999);
    }
    // Something happened in setting up the request that triggered an Error
    console.log("Error", error.message);
    throw new _exceptions_GeneralError__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z("Opps! There was a problem. Please try again later.", 400);
};
function fetchReverseGeoCode(apiPath) {
    const axiosInsLocation = axios.create();
    axiosInsLocation.defaults.timeout = 300000;
    axiosRetry(axiosInsLocation, {
        retries: 3
    });
    return axiosInsLocation.get(apiPath).then((response)=>response.data).catch(errorHandler);
}
async function apiGet(apiPath, config = {}, useMock = false, external = false, withCredentials = false) {
    const axiosToUse = useMock ? axiosInstance : axios;
    const fullUrl = useMock || external ? apiPath : _constantData_constants__WEBPACK_IMPORTED_MODULE_2__/* .API_BASE_URL */ .CT + apiPath;
    const newConfig = await headerConfiguration(apiPath, config);
    console.log("newConfig......", newConfig);
    (0,axios_retry__WEBPACK_IMPORTED_MODULE_1__["default"])(axiosToUse, {
        retries: 3
    });
    return await axiosToUse.get(fullUrl, newConfig).then((response)=>response.data).catch(errorHandler);
}
async function apiPost(apiPath, data, config = {}, useMock = false, withCredentials = false) {
    const newConfig = await headerConfiguration(apiPath, config, data?.token ?? "");
    const transformedData = transformConfig(newConfig, data);
    const axiosToUse = useMock ? axiosInstance : axios;
    const fullUrl = useMock ? apiPath : _constantData_constants__WEBPACK_IMPORTED_MODULE_2__/* .API_BASE_URL */ .CT + apiPath;
    return await axiosToUse.post(fullUrl, transformedData, newConfig).then((response)=>response.data).catch(errorHandler);
}
async function fetchRequest(apiPath, payload, config) {
    const temConfig = await headerConfiguration(apiPath, config, "");
    const newConfig = {
        credentials: "same-origin",
        mode: "cors",
        cache: "no-cache",
        ...temConfig,
        body: JSON.stringify(payload)
    };
    const fullUrl = API_BASE_URL + apiPath;
    return await fetch(fullUrl, newConfig).then(handleFetchErrors).then((response)=>response.json());
}
async function apiPut(apiPath, data, config = {}, useMock = false, withCredentials = true) {
    const newConfig = await headerConfiguration(apiPath, config, data?.token ?? "");
    const transformedData = transformConfig(newConfig, data);
    const axiosToUse = useMock ? axiosInstance : axios;
    const fullUrl = useMock ? apiPath : _constantData_constants__WEBPACK_IMPORTED_MODULE_2__/* .API_BASE_URL */ .CT + apiPath;
    return await axiosToUse.put(fullUrl, transformedData, newConfig).then((response)=>response.data).catch(errorHandler);
}
async function apiDelete(apiPath, config = {}, withCredentials = true) {
    /*if (withCredentials) {
    config.withCredentials = true;
  }*/ const newConfig = await headerConfiguration(apiPath, config, "");
    const fullUrl = API_BASE_URL + apiPath;
    return await axios.delete(fullUrl, newConfig).then((response)=>response.data).catch(errorHandler);
}
function apiGetFromExternalServer(apiPath) {
    const axiosToUse = axios;
    const fullUrl = apiPath;
    const newConfig = {};
    return axiosToUse.get(fullUrl, newConfig).then((response)=>response.data).catch(errorHandler);
}


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4532:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ AxiosError)
/* harmony export */ });
class AxiosError extends Error {
    constructor(messages = null, statusCode = 400, ...params){
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(...params);
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AxiosError);
        }
        this.name = "AxiosError";
        // Custom debugging information
        this.errors = messages;
        this.statusCode = statusCode;
    }
}


/***/ }),

/***/ 2247:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ GeneralError)
/* harmony export */ });
class GeneralError extends Error {
    constructor(messages = null, statusCode = 400, ...params){
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(...params);
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, GeneralError);
        }
        this.name = "AxiosError";
        // Custom debugging information
        this.errors = messages;
        this.statusCode = statusCode;
    }
}


/***/ }),

/***/ 2021:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CT: () => (/* binding */ API_BASE_URL),
/* harmony export */   FX: () => (/* binding */ APP_URL),
/* harmony export */   bm: () => (/* binding */ PLAN_DURATION),
/* harmony export */   i8: () => (/* binding */ PLAN_STORAGE),
/* harmony export */   oR: () => (/* binding */ LINKED_APP_URL),
/* harmony export */   qz: () => (/* binding */ ACCESS)
/* harmony export */ });
/* unused harmony exports BASE_URL, IMAGE_BASE_URL, WEB_SOCKET_BASE_URL, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, TEMTIME, TIME_SOUDI, RESULT_SHOEING_DURATION, USER_TYPES */
// export const BASE_URL = "https://sinewycare.com/";
const BASE_URL = "http://127.0.0.1:8000/";
// export const BASE_URL = "https://sandbox.saas-back.macrohealthplus.org/";
const API_BASE_URL = BASE_URL + "api/";
// export const IMAGE_BASE_URL = "https://sandbox.saas.macrohealthplus.org/images/users/";
const IMAGE_BASE_URL = "http://localhost:3002/images/users/";
// export const APP_URL = "http://34.126.183.51:3000/";
const APP_URL = "http://localhost:3002/";
const LINKED_APP_URL = APP_URL + "/register";
const WEB_SOCKET_BASE_URL = "";
const AWS_ACCESS_KEY_ID = "";
const AWS_SECRET_ACCESS_KEY = "";
let newTime = parseInt(new Date().toString().split(" GMT")[1].split(" ")[0]);
let timeZone = newTime / 100 + (newTime % 100 ? 0.5 : 0);
const TEMTIME = -timeZone * 60 + 180;
/*
export const TIME_SOUDI =
  (-parseInt(new Date().getTimezoneOffset()) + 180) * 60 * 1000;*/ const TIME_SOUDI = (/* unused pure expression or super */ null && (-180 * 60 * 1000));
const RESULT_SHOEING_DURATION = Math.ceil((Math.abs(parseInt(new Date().getTimezoneOffset()) + 180) + 120) / 60);
const PLAN_DURATION = [
    {
        day: 7,
        name: "One Week"
    },
    {
        day: 15,
        name: "15 Days"
    },
    {
        day: 30,
        name: "One Month"
    },
    {
        day: 60,
        name: "Two Months"
    },
    {
        day: 90,
        name: "Three Months"
    },
    {
        day: 180,
        name: "Half Year"
    },
    {
        day: 7,
        365: "One Year"
    }
];
const PLAN_STORAGE = [
    {
        limit: 500,
        name: "500 MB"
    },
    {
        limit: 1028,
        name: "1 GB"
    },
    {
        limit: 2056,
        name: "2 GB"
    },
    {
        limit: 3084,
        name: "3 GB"
    },
    {
        limit: 5140,
        name: "5 GB"
    },
    {
        limit: 10280,
        name: "10 GB"
    },
    {
        limit: 20560,
        name: "20 GB"
    }
];
const USER_TYPES = [
    {
        key: 0,
        name: "Super Admin"
    },
    {
        key: 1,
        name: "Super Admin"
    },
    {
        key: 2,
        name: "Super User"
    },
    {
        key: 3,
        name: "Organization Admin"
    },
    {
        key: 4,
        name: "Organization User"
    },
    {
        limit: 5,
        name: "User"
    }
];
const ACCESS = {
    SUPER_ADMIN: 0,
    SUPER_USER: 2,
    LOCAL_ADMIN: 3,
    LOCAL_USER: 4,
    OTHER: 5
}; //const now = moment(new Date(Date.now() - timeDiffSaudi * 60 * 1000));


/***/ }),

/***/ 294:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GN: () => (/* binding */ ADMIN),
/* harmony export */   j8: () => (/* binding */ LOGIN_SCREEN_URL),
/* harmony export */   s7: () => (/* binding */ DASHBOARD_SCREEN_URL)
/* harmony export */ });
const ADMIN = {
    SUBSCRIPTION_PLAN_LIST: "/subscription",
    FEATURE_PLAN_LIST: "/feature",
    FEATURE_PLAN_EDIT: "/edit-feature",
    COUPON_PLAN_LIST: "/coupon",
    COUPON_PLAN_EDIT: "/coupon/edit",
    SUBSCRIPTION_ADD_URL: "/subscription/add",
    SUBSCRIPTION_EDIT_URL: "/subscription/edit",
    SUBSCRIPTION_REQUEST: "/subscription-request",
    SUBSCRIPTION_REQUEST_LIST: "/subscription-request",
    REFUND_LIST: "/refund-list",
    CANCEL_REQUEST_LIST: "/cancel-request",
    USER_REQUEST: "/user",
    USER_ADD_URL: "/user/add",
    USER_EDIT_URL: "/user/edit",
    ORGANIZATION_ADD_URL: "/organization/add",
    ORGANIZATION_EDIT_URL: "/organization/edit",
    ORGANIZATION_LIST: "/organization",
    STORAGE_EDIT_URL: "/storage-limit/edit",
    STORAGE_ADD_URL: "/storage-limit/add",
    STORAGE_LIST_URL: "/storage-limit",
    VALIDITY_ADD_URL: "/validity/add",
    VALIDITY_LIST_URL: "/validity",
    AUDIT_LIST_URL: "/audit",
    HISTORY_URL: "/history"
};
const LOGIN_SCREEN_URL = "/auth/login";
const DASHBOARD_SCREEN_URL = "/";


/***/ }),

/***/ 2128:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Am: () => (/* binding */ FEATURE_DELETE_URL),
/* harmony export */   BU: () => (/* binding */ DASHBORD_URL),
/* harmony export */   CT: () => (/* binding */ GLOBAL_SETTING_DETAILS_URL),
/* harmony export */   Cb: () => (/* binding */ FEATURE_DETAILS_URL),
/* harmony export */   Cl: () => (/* binding */ VALIDITY_LIST_URL),
/* harmony export */   D0: () => (/* binding */ HISTORY_LIST_URL),
/* harmony export */   E6: () => (/* binding */ SPECIAL_SUBSCRIPTION_PLAN_LIST_URL),
/* harmony export */   FJ: () => (/* binding */ RESET_PASSWORD_URL),
/* harmony export */   FO: () => (/* binding */ REPORT_USERS_PLAN_LIST_URL),
/* harmony export */   H2: () => (/* binding */ CANCEL_URL),
/* harmony export */   HR: () => (/* binding */ BRANCH_UPDATE_URL),
/* harmony export */   IS: () => (/* binding */ BRANCH_BY_ORGANIZATION_URL),
/* harmony export */   Ib: () => (/* binding */ CUPON_DELETE_MULTIPLE_URL),
/* harmony export */   Iq: () => (/* binding */ ORGANIZATION_STORE_URL),
/* harmony export */   Ix: () => (/* binding */ SMS_GATEWAY_LIST_URL),
/* harmony export */   JE: () => (/* binding */ COUPON_STORE_URL),
/* harmony export */   Jb: () => (/* binding */ FEATURE_LIST_URL),
/* harmony export */   K0: () => (/* binding */ GOOGLE_LOGIN_URL),
/* harmony export */   Kf: () => (/* binding */ PAYMENT_SUCCESS_URL),
/* harmony export */   MX: () => (/* binding */ SUBSCRIPTION_LIST_URL),
/* harmony export */   M_: () => (/* binding */ FORGET_PASSWORD_URL),
/* harmony export */   ND: () => (/* binding */ USER_ORGANIZATION_INFO),
/* harmony export */   Nr: () => (/* binding */ OWN_DETAILS_URL),
/* harmony export */   Nv: () => (/* binding */ LOGOUT),
/* harmony export */   UH: () => (/* binding */ ORGANIZATION_DELETE_URL),
/* harmony export */   Wy: () => (/* binding */ OTP_LOGIN_URL),
/* harmony export */   XT: () => (/* binding */ SUBSCRIPTION_PLAN_DELETE_URL),
/* harmony export */   Xv: () => (/* binding */ SUBSCRIPTION_PLAN_LIST_URL),
/* harmony export */   Y0: () => (/* binding */ UPGRADEABLE_DETAILS_URL),
/* harmony export */   YJ: () => (/* binding */ SUBSCRIPTION_STORE_URL),
/* harmony export */   YX: () => (/* binding */ COUPON_URL),
/* harmony export */   Z8: () => (/* binding */ CANCEL_REQUEST_LIST_URL),
/* harmony export */   ZE: () => (/* binding */ LOGIN_URL),
/* harmony export */   ZL: () => (/* binding */ SETTING_UPDATE_URL),
/* harmony export */   ZX: () => (/* binding */ ORGANIZATION_LIST),
/* harmony export */   Zk: () => (/* binding */ SMS_GATEWAY_STORE_URL),
/* harmony export */   _H: () => (/* binding */ USER_LIST_URL),
/* harmony export */   _f: () => (/* binding */ ORGANIZATION_LIST_URL),
/* harmony export */   _r: () => (/* binding */ OWN_PASSWORD_UPDATE_URL),
/* harmony export */   b9: () => (/* binding */ GET_ALL_ORGANIZATION_FOR_BRANCH),
/* harmony export */   cJ: () => (/* binding */ STORAGE_LIST_URL),
/* harmony export */   dd: () => (/* binding */ SUBSCRIPTION_REQUEST_ACCEPT_URL),
/* harmony export */   fI: () => (/* binding */ SUBSCRIPTION_PLAN_DELETE_MULTIPLE_URL),
/* harmony export */   fL: () => (/* binding */ UPDATE_SMS_GATEWAY_URL),
/* harmony export */   fi: () => (/* binding */ USER_STORE_URL),
/* harmony export */   gS: () => (/* binding */ BRANCH_STORE_URL),
/* harmony export */   h9: () => (/* binding */ ACTIVITY_LIST_URL),
/* harmony export */   iG: () => (/* binding */ SIGNUP_URL),
/* harmony export */   jX: () => (/* binding */ VALIDITY_STORE_URL),
/* harmony export */   jb: () => (/* binding */ FETCH_BRANCH_ALL_URL),
/* harmony export */   jo: () => (/* binding */ COUPON_LIST_URL),
/* harmony export */   jw: () => (/* binding */ OWN_ORGANIZATION_INFO_UPDATE),
/* harmony export */   kE: () => (/* binding */ ACCEPT_CANCEL_REQUEST_URL),
/* harmony export */   mi: () => (/* binding */ REPORT_SUBSCRIPTION_PLAN_LIST_URL),
/* harmony export */   o2: () => (/* binding */ SUBSCRIPTION_REQUEST_DELETE_MULTIPLE_URL),
/* harmony export */   p5: () => (/* binding */ STORAGE_STORE_URL),
/* harmony export */   qX: () => (/* binding */ GET_AUTH_TOKEN),
/* harmony export */   rM: () => (/* binding */ REFUND_LIST_URL),
/* harmony export */   rX: () => (/* binding */ NOTIFICATION_SEEN_URL),
/* harmony export */   s6: () => (/* binding */ REDIRECT_TOKEN),
/* harmony export */   tJ: () => (/* binding */ FEATURE_STORE_URL),
/* harmony export */   tg: () => (/* binding */ NOTIFICATION_URL),
/* harmony export */   tk: () => (/* binding */ USER_ME),
/* harmony export */   uO: () => (/* binding */ REPORT_ORGANIZATION_PLAN_LIST_URL),
/* harmony export */   uc: () => (/* binding */ OWN_PROFILE_UPDATE_URL),
/* harmony export */   vD: () => (/* binding */ SUBSCRIPTION_UPGRADE_URL),
/* harmony export */   vY: () => (/* binding */ SUBSCRIPTION_REQUEST_LIST),
/* harmony export */   w8: () => (/* binding */ SCOPS_LIST_URL),
/* harmony export */   wD: () => (/* binding */ USER_DELETE_URL),
/* harmony export */   xj: () => (/* binding */ PACKAGE_TRANSACTION_URL),
/* harmony export */   yR: () => (/* binding */ SUBSCRIPTION_REQUEST_STORE_URL),
/* harmony export */   yd: () => (/* binding */ SETTING_DETAILS_URL),
/* harmony export */   zW: () => (/* binding */ REFUND_UPDATE_REQUEST_URL)
/* harmony export */ });
/* unused harmony exports SUBSCRIPTION_PLAN_DETAILS_URL, CUPON_DELETE_URL, ACTIVITY_DETAILS_URL, UPGRADESUBSCRIPTION_URL, CARD_URL, CANCEL_REQUEST_DATA_URL */
const LOGIN_URL = "v1/login";
const OTP_LOGIN_URL = "v1/login/otp";
const GOOGLE_LOGIN_URL = "v1/google/login";
const LOGOUT = "v1/auth/logout";
const REDIRECT_TOKEN = "v1/auth/redirect/token";
const GET_AUTH_TOKEN = "v1/get/token";
const SIGNUP_URL = "auth/register";
const USER_ME = "v1/auth/user/me";
const SUBSCRIPTION_STORE_URL = "v1/auth/subscription/store";
const SUBSCRIPTION_REQUEST_LIST = "v1/auth/subscription/request/list";
const SUBSCRIPTION_REQUEST_ACCEPT_URL = "v1/auth/subscription/request";
const SUBSCRIPTION_LIST_URL = "v1/auth/subscription";
const SUBSCRIPTION_REQUEST_STORE_URL = "v1/subscription-request";
const SUBSCRIPTION_PLAN_LIST_URL = "v1/subscription-plan";
const SPECIAL_SUBSCRIPTION_PLAN_LIST_URL = "v1/auth/subscription/special";
const FEATURE_STORE_URL = "v1/auth/feature/store";
const UPDATE_SMS_GATEWAY_URL = "v1/auth/sms/update-sms-gateway";
const SMS_GATEWAY_STORE_URL = "v1/auth/sms/create-sms-gateway";
const SMS_GATEWAY_LIST_URL = "v1/auth/sms/get-sms-gateway";
const PACKAGE_TRANSACTION_URL = "v1/auth/sms/transaction-sms-all";
const GET_ALL_ORGANIZATION_FOR_BRANCH = "v1/auth/branch/organization";
const BRANCH_STORE_URL = "v1/auth/branch/store";
const FETCH_BRANCH_ALL_URL = "v1/auth/branch/list";
const BRANCH_UPDATE_URL = "v1/auth/branch/edit";
const BRANCH_BY_ORGANIZATION_URL = "v1/auth/branch/organization";
const FEATURE_LIST_URL = "v1/auth/feature";
const FEATURE_DETAILS_URL = "v1/auth/feature/";
const FEATURE_DELETE_URL = "v1/auth/feature/delete";
const SUBSCRIPTION_PLAN_DETAILS_URL = "v1/auth/subscription/";
const SUBSCRIPTION_PLAN_DELETE_URL = "v1/auth/subscription/delete/";
const SUBSCRIPTION_PLAN_DELETE_MULTIPLE_URL = "v1/auth/subscription/delete";
const SUBSCRIPTION_REQUEST_DELETE_MULTIPLE_URL = "v1/auth/subscription/request/delete";
const COUPON_STORE_URL = "v1/auth/coupon/store";
const FORGET_PASSWORD_URL = "v1/forget/password";
const RESET_PASSWORD_URL = "v1/reset/password";
const COUPON_LIST_URL = "v1/auth/coupon";
const CUPON_DELETE_URL = "v1/auth/coupon/delete/";
const CUPON_DELETE_MULTIPLE_URL = "v1/auth/coupon/delete/multiple";
const USER_LIST_URL = "v1/auth/user";
const USER_STORE_URL = "v1/auth/user/store";
const USER_DELETE_URL = "v1/auth/user/delete";
const OWN_DETAILS_URL = "v1/auth/user/me";
const OWN_PROFILE_UPDATE_URL = "v1/auth/user/update/profile";
const OWN_PASSWORD_UPDATE_URL = "v1/auth/user/update/password";
const ORGANIZATION_LIST_URL = "v1/auth/organization";
const ORGANIZATION_DELETE_URL = "v1/auth/organization/delete";
const ORGANIZATION_STORE_URL = "v1/auth/organization/store";
const USER_ORGANIZATION_INFO = "v1/auth/organization-details";
const OWN_ORGANIZATION_INFO_UPDATE = "v1/auth/user/organization/update";
const STORAGE_LIST_URL = "v1/auth/storage";
const STORAGE_STORE_URL = "v1/auth/storage/store";
const VALIDITY_STORE_URL = "v1/auth/validity/store";
const VALIDITY_LIST_URL = "v1/auth/validity";
const ORGANIZATION_LIST = "v1/auth/organization/list";
const SETTING_DETAILS_URL = "v1/auth/setting";
const GLOBAL_SETTING_DETAILS_URL = "v1/global/setting";
const SETTING_UPDATE_URL = "v1/auth/setting/update";
const SCOPS_LIST_URL = "v1/auth/models";
const ACTIVITY_LIST_URL = "v1/auth/activity";
const ACTIVITY_DETAILS_URL = "v1/auth/activity/1";
const UPGRADEABLE_DETAILS_URL = "v1/auth/upgradeable/subscription";
const UPGRADESUBSCRIPTION_URL = "v1/auth/upgrade/subscription";
const CARD_URL = "v1/auth/store/card";
const CANCEL_URL = "v1/auth/subscription/cancel/request";
const PAYMENT_SUCCESS_URL = "v1/auth/payment/success";
const REPORT_SUBSCRIPTION_PLAN_LIST_URL = "v1/auth/report/subscription-plan";
const REPORT_ORGANIZATION_PLAN_LIST_URL = "v1/auth/report/organization";
const REPORT_USERS_PLAN_LIST_URL = "v1/auth/report/users";
const CANCEL_REQUEST_LIST_URL = "v1/auth/subscription/cancel/request/list";
const CANCEL_REQUEST_DATA_URL = "v1/auth/subscription/cancel/request";
const ACCEPT_CANCEL_REQUEST_URL = "v1/auth/subscription/cancel/request/approve";
const REFUND_LIST_URL = "v1/auth/refund/list";
const REFUND_UPDATE_REQUEST_URL = "v1/auth/refund/update";
const HISTORY_LIST_URL = "v1/auth/payment/history";
const COUPON_URL = "v1/auth/check/coupon";
const SUBSCRIPTION_UPGRADE_URL = "v1/auth/upgrade/subscription";
const DASHBORD_URL = "v1/auth/dashboard";
const NOTIFICATION_URL = "v1/auth/notifications";
const NOTIFICATION_SEEN_URL = "v1/auth/notification/status";


/***/ }),

/***/ 5944:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $K: () => (/* binding */ isDefined)
/* harmony export */ });
/* unused harmony exports uuidv4, random32BitInteger, millisecondConvert, millisecondsDifference, checkIsExpired, durationString, syntaxHighlightJson, jsonConvert */
function isDefined(object, property = null) {
    if (property === null) {
        return typeof object !== "undefined";
    }
    return typeof object !== "undefined" && object && typeof object[property] !== "undefined";
}
function timeConversion(time) {
    return time;
}
function uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c === "x" ? r : r & 0x3 | 0x8;
        return v.toString(16);
    });
}
function random32BitInteger(max = 2147483647) {
    return Math.floor(Math.random() * Math.floor(max));
}
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function durationString(sec, isNumeric) {
    return isNumeric ? `${Math.floor(sec / 60)}:${Math.ceil(sec % 60)}` : `${Math.floor(sec / 60 / 60)} hr ${Math.floor(sec / 60 % 60)} mins ${sec % 60} sec`;
}
function millisecondConvert(millisecond) {
    const d = new Date(millisecond);
    return d.toLocaleString();
}
function millisecondsDifference(date1, date2) {
    const one_day = 1000 * 60 * 60 * 24;
    const difference_ms = date1 - date2;
    const result = Math.round(difference_ms / one_day);
    if (isNaN(result)) {
        return "0";
    } else {
        return result;
    }
}
function checkIsExpired(date) {
    const currentTime = Date.now();
    return date <= currentTime;
}
function jsonConvert(obj) {
    return JSON.parse(JSON.stringify(obj));
}
function syntaxHighlightJson(json) {
    if (typeof json !== "string") {
        json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
        var cls = "number";
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = "key";
            } else {
                cls = "string";
            }
        } else if (/true|false/.test(match)) {
            cls = "boolean";
        } else if (/null/.test(match)) {
            cls = "null";
        }
        return '<span class="' + cls + '">' + match + "</span>";
    });
}



/***/ }),

/***/ 261:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Eu: () => (/* binding */ useAuthContext),
/* harmony export */   Ho: () => (/* binding */ AuthProvider),
/* harmony export */   Vo: () => (/* binding */ AuthContext),
/* harmony export */   he: () => (/* binding */ AuthConsumer)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(580);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);



const HANDLERS = {
    INITIALIZE: "INITIALIZE",
    SIGN_IN: "SIGN_IN",
    SIGN_OUT: "SIGN_OUT"
};
const initialState = {
    isAuthenticated: true,
    isLoading: true,
    user: null
};
const handlers = {
    [HANDLERS.INITIALIZE]: (state, action)=>{
        const user = action.payload;
        return {
            ...state,
            ...// if payload (user) is provided, then is authenticated
            user ? {
                isAuthenticated: true,
                isLoading: false,
                user
            } : {
                isLoading: false
            }
        };
    },
    [HANDLERS.SIGN_IN]: (state, action)=>{
        const user = action.payload;
        return {
            ...state,
            isAuthenticated: true,
            user
        };
    },
    [HANDLERS.SIGN_OUT]: (state)=>{
        return {
            ...state,
            isAuthenticated: false,
            user: null
        };
    }
};
const reducer = (state, action)=>handlers[action.type] ? handlers[action.type](state, action) : state;
// The role of this context is to propagate authentication state through the App tree.
const AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({
    undefined
});
const AuthProvider = (props)=>{
    const { children } = props;
    const [state, dispatch] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useReducer)(reducer, initialState);
    const initialized = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
    const initialize = async ()=>{
        // Prevent from calling twice in development mode with React.StrictMode enabled
        if (initialized.current) {
            return;
        }
        initialized.current = true;
        let isAuthenticated = false;
        try {
            isAuthenticated = window.sessionStorage.getItem("authenticated") === "true";
        } catch (err) {
            console.error(err);
        }
        if (isAuthenticated) {
            const user = {
                id: "",
                avatar: "/assets/avatars/avatar-anika-visser.png",
                name: "",
                email: ""
            };
            dispatch({
                type: HANDLERS.INITIALIZE,
                payload: user
            });
        } else {
            dispatch({
                type: HANDLERS.INITIALIZE
            });
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        initialize();
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    const skip = ()=>{
        try {
            window.sessionStorage.setItem("authenticated", "true");
        } catch (err) {
            console.error(err);
        }
        const user = {
            id: "5e86809283e28b96d2d38537",
            avatar: "/assets/avatars/avatar-anika-visser.png",
            name: "Anika Visser",
            email: "anika.visser@devias.io"
        };
        dispatch({
            type: HANDLERS.SIGN_IN,
            payload: user
        });
    };
    // const signIn = async (email, password) => {
    //   if (email !== 'demo@devias.io' || password !== 'Password123!') {
    //     throw new Error('Please check your email and password');
    //   }
    //
    //   try {
    //     window.sessionStorage.setItem('authenticated', 'true');
    //   } catch (err) {
    //     console.error(err);
    //   }
    //
    //   const user = {
    //     id: '5e86809283e28b96d2d38537',
    //     avatar: '/assets/avatars/avatar-anika-visser.png',
    //     name: 'Anika Visser',
    //     email: 'anika.visser@devias.io'
    //   };
    //
    //   dispatch({
    //     type: HANDLERS.SIGN_IN,
    //     payload: user
    //   });
    // };
    const signIn = async (payload)=>{
        console.log(payload, "payload");
        try {
            window.sessionStorage.setItem("authenticated", "true");
            if (payload?.token) {
                window.sessionStorage.setItem("token", payload?.token ?? "");
            }
        } catch (err) {
            console.error(err);
        }
        const user = {
            id: payload?.id ?? "5e86809283e28b96d2d38537",
            avatar: "/assets/avatars/avatar-anika-visser.png",
            name: payload?.name ?? "User",
            email: payload?.email ?? "user@gmail.com",
            user: payload ?? {}
        };
        dispatch({
            type: HANDLERS.SIGN_IN,
            payload: user
        });
    };
    const signUp = async (email, name, password)=>{
        throw new Error("Sign up is not implemented");
    };
    const signOut = ()=>{
        dispatch({
            type: HANDLERS.SIGN_OUT
        });
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(AuthContext.Provider, {
        value: {
            ...state,
            skip,
            signIn,
            signUp,
            signOut
        },
        children: children
    });
};
AuthProvider.propTypes = {
    children: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().node)
};
const AuthConsumer = AuthContext.Consumer;
const useAuthContext = ()=>(0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(AuthContext);


/***/ }),

/***/ 926:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ useAuth)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var src_contexts_auth_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(261);


const useAuth = ()=>(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(src_contexts_auth_context__WEBPACK_IMPORTED_MODULE_1__/* .AuthContext */ .Vo);


/***/ }),

/***/ 9724:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   e: () => (/* binding */ useNProgress)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(808);
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(nprogress__WEBPACK_IMPORTED_MODULE_2__);



function useNProgress() {
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        next_router__WEBPACK_IMPORTED_MODULE_1___default().events.on("routeChangeStart", (nprogress__WEBPACK_IMPORTED_MODULE_2___default().start));
        next_router__WEBPACK_IMPORTED_MODULE_1___default().events.on("routeChangeError", (nprogress__WEBPACK_IMPORTED_MODULE_2___default().done));
        next_router__WEBPACK_IMPORTED_MODULE_1___default().events.on("routeChangeComplete", (nprogress__WEBPACK_IMPORTED_MODULE_2___default().done));
        return ()=>{
            next_router__WEBPACK_IMPORTED_MODULE_1___default().events.off("routeChangeStart", (nprogress__WEBPACK_IMPORTED_MODULE_2___default().start));
            next_router__WEBPACK_IMPORTED_MODULE_1___default().events.off("routeChangeError", (nprogress__WEBPACK_IMPORTED_MODULE_2___default().done));
            next_router__WEBPACK_IMPORTED_MODULE_1___default().events.off("routeChangeComplete", (nprogress__WEBPACK_IMPORTED_MODULE_2___default().done));
        };
    }, []);
}


/***/ }),

/***/ 8375:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(968);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3139);
/* harmony import */ var _mui_x_date_pickers_LocalizationProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5753);
/* harmony import */ var _mui_x_date_pickers_LocalizationProvider__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_x_date_pickers_LocalizationProvider__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mui_x_date_pickers_AdapterDateFns__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4046);
/* harmony import */ var _mui_x_date_pickers_AdapterDateFns__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_x_date_pickers_AdapterDateFns__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5692);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8442);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_mui_material_styles__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var src_contexts_auth_context__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(261);
/* harmony import */ var src_hooks_use_nprogress__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9724);
/* harmony import */ var src_theme__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(6502);
/* harmony import */ var src_utils_create_emotion_cache__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(3822);
/* harmony import */ var simplebar_react_dist_simplebar_min_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(8710);
/* harmony import */ var simplebar_react_dist_simplebar_min_css__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(simplebar_react_dist_simplebar_min_css__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var src_stateManagement_Store__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(9312);
/* harmony import */ var _contex_set__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(3361);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_emotion_react__WEBPACK_IMPORTED_MODULE_2__, src_stateManagement_Store__WEBPACK_IMPORTED_MODULE_13__, _contex_set__WEBPACK_IMPORTED_MODULE_14__]);
([_emotion_react__WEBPACK_IMPORTED_MODULE_2__, src_stateManagement_Store__WEBPACK_IMPORTED_MODULE_13__, _contex_set__WEBPACK_IMPORTED_MODULE_14__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);













const clientSideEmotionCache = (0,src_utils_create_emotion_cache__WEBPACK_IMPORTED_MODULE_10__/* .createEmotionCache */ .S)();
const SplashScreen = ()=>null;


const App = (props)=>{
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
    (0,src_hooks_use_nprogress__WEBPACK_IMPORTED_MODULE_8__/* .useNProgress */ .e)();
    const getLayout = Component.getLayout ?? ((page)=>page);
    const theme = (0,src_theme__WEBPACK_IMPORTED_MODULE_9__/* .createTheme */ .j)();
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_redux__WEBPACK_IMPORTED_MODULE_12__.Provider, {
        store: src_stateManagement_Store__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .Z,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_emotion_react__WEBPACK_IMPORTED_MODULE_2__.CacheProvider, {
            value: emotionCache,
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_head__WEBPACK_IMPORTED_MODULE_1___default()), {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("title", {
                            children: "SmartHealth"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                            name: "viewport",
                            content: "initial-scale=1, width=device-width"
                        })
                    ]
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_x_date_pickers_LocalizationProvider__WEBPACK_IMPORTED_MODULE_3__.LocalizationProvider, {
                    dateAdapter: _mui_x_date_pickers_AdapterDateFns__WEBPACK_IMPORTED_MODULE_4__.AdapterDateFns,
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(src_contexts_auth_context__WEBPACK_IMPORTED_MODULE_7__/* .AuthProvider */ .Ho, {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_contex_set__WEBPACK_IMPORTED_MODULE_14__["default"], {}),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material_styles__WEBPACK_IMPORTED_MODULE_6__.ThemeProvider, {
                                theme: theme,
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_5__.CssBaseline, {}),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(src_contexts_auth_context__WEBPACK_IMPORTED_MODULE_7__/* .AuthConsumer */ .he, {
                                        children: (auth)=>auth.isLoading ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(SplashScreen, {}) : getLayout(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
                                                ...pageProps
                                            }))
                                    })
                                ]
                            })
                        ]
                    })
                })
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 894:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6859);
/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_document__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _emotion_server_create_instance__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9552);
/* harmony import */ var _emotion_server_create_instance__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_emotion_server_create_instance__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var src_utils_create_emotion_cache__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3822);





const Favicon = ()=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                rel: "apple-touch-icon",
                sizes: "180x180",
                href: "/favicon.ico"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                rel: "icon",
                href: "/favicon.ico"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                rel: "icon",
                sizes: "32x32",
                href: "/favicon.ico"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                rel: "icon",
                sizes: "16x16",
                href: "/favicon.ico"
            })
        ]
    });
const Fonts = ()=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                rel: "preconnect",
                href: "https://fonts.googleapis.com"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                rel: "preconnect",
                href: "https://fonts.gstatic.com"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400&display=swap"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700&display=swap"
            })
        ]
    });
class CustomDocument extends (next_document__WEBPACK_IMPORTED_MODULE_2___default()) {
    render() {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(next_document__WEBPACK_IMPORTED_MODULE_2__.Html, {
            lang: "en",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(next_document__WEBPACK_IMPORTED_MODULE_2__.Head, {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Favicon, {}),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Fonts, {})
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("body", {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_document__WEBPACK_IMPORTED_MODULE_2__.Main, {}),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_document__WEBPACK_IMPORTED_MODULE_2__.NextScript, {})
                    ]
                })
            ]
        });
    }
}
CustomDocument.getInitialProps = async (ctx)=>{
    const originalRenderPage = ctx.renderPage;
    const cache = (0,src_utils_create_emotion_cache__WEBPACK_IMPORTED_MODULE_4__/* .createEmotionCache */ .S)();
    const { extractCriticalToChunks } = _emotion_server_create_instance__WEBPACK_IMPORTED_MODULE_3___default()(cache);
    ctx.renderPage = ()=>originalRenderPage({
            enhanceApp: (App)=>(props)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(App, {
                        emotionCache: cache,
                        ...props
                    })
        });
    const initialProps = await next_document__WEBPACK_IMPORTED_MODULE_2___default().getInitialProps(ctx);
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("style", {
            "data-emotion": `${style.key} ${style.ids.join(" ")}`,
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML: {
                __html: style.css
            }
        }, style.key));
    return {
        ...initialProps,
        styles: [
            ...react__WEBPACK_IMPORTED_MODULE_1__.Children.toArray(initialProps.styles),
            ...emotionStyleTags
        ]
    };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CustomDocument);


/***/ }),

/***/ 3361:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9332);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _stateManagement_global_globalSelector__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(15);
/* harmony import */ var _stateManagement_global_GlobalActionCreators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(4005);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var src_hooks_use_auth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(926);
/* harmony import */ var _stateManagement_auth_AuthSelector__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6903);
/* harmony import */ var _stateManagement_auth_AuthActionCreators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7328);
/* harmony import */ var _common_apiCall_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5110);
/* harmony import */ var _common_constantData_screenUrl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(294);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_common_apiCall_api__WEBPACK_IMPORTED_MODULE_5__]);
_common_apiCall_api__WEBPACK_IMPORTED_MODULE_5__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];











const mapStateToProps = (state)=>({
        isAuthenticated: (0,_stateManagement_global_globalSelector__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z)(state)?.isAuthenticated,
        userProfile: (0,_stateManagement_auth_AuthSelector__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z)(state)?.userProfile
    });
const mapDispatchToProps = (dispatch)=>({
        setUserProfileToReducerProp: (data)=>dispatch((0,_stateManagement_auth_AuthActionCreators__WEBPACK_IMPORTED_MODULE_9__/* .setUserProfileToReducer */ .c9)(data)),
        setGlobalSettingToReducerProp: (data)=>dispatch((0,_stateManagement_global_GlobalActionCreators__WEBPACK_IMPORTED_MODULE_10__/* .setGlobalSettingToReducer */ .yU)(data)),
        setIsAuthenticatedProp: (data)=>dispatch((0,_stateManagement_global_GlobalActionCreators__WEBPACK_IMPORTED_MODULE_10__/* .setIsAuthenticated */ .BF)(data)),
        setValidityToReducerProp: (data)=>dispatch((0,_stateManagement_global_GlobalActionCreators__WEBPACK_IMPORTED_MODULE_10__/* .setValidityToReducer */ .v1)(data))
    });
const ContextSet = (props)=>{
    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const auth = (0,src_hooks_use_auth__WEBPACK_IMPORTED_MODULE_4__/* .useAuth */ .a)();
    const unatuthentedUrlList = [
        "/subscription_request",
        "register",
        "/auth/send-otp",
        "send-otp",
        "auth/reset-password"
    ];
    if (false) {}
    const featcSettings = ()=>{
        (0,_common_apiCall_api__WEBPACK_IMPORTED_MODULE_5__/* .fetchGlobalSettingAPIGet */ .tJ)().then((response)=>{
            if (response.code == 200) {
                props.setGlobalSettingToReducerProp(response?.data);
            }
        }).catch((err)=>{});
    };
    const featcUserProfile = ()=>{
        (0,_common_apiCall_api__WEBPACK_IMPORTED_MODULE_5__/* .fetchUserProfileAPIGet */ .s6)().then((response)=>{
            props.setUserProfileToReducerProp(response?.data);
            props.setValidityToReducerProp(response?.data?.expire_within ?? 100);
            props.setIsAuthenticatedProp({
                status: true
            });
            auth.signIn(response?.data?.user).then((r)=>{
            // if(response?.data?.is_tem_password==1){
            //   router.push('/account-settings')
            // }
            //router.push(DASHBOARD_SCREEN_URL)
            }).catch((err)=>{
                console.log(err);
            });
        }).catch((err)=>{
            auth.signOut();
            props.setUserProfileToReducerProp({});
            props.setIsAuthenticatedProp({
                status: false
            });
            let allurl = window.location.href.split("/");
            let url = allurl[allurl.length - 1].split("?")[0];
            if (!unatuthentedUrlList.includes(url)) {
                router.push(_common_constantData_screenUrl__WEBPACK_IMPORTED_MODULE_6__/* .LOGIN_SCREEN_URL */ .j8);
            }
        //
        });
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        featcSettings();
        if (props.isAuthenticated && props?.userProfile?.name) {
            auth.signIn(props.userProfile).then(()=>{
                featcSettings();
            }).catch((err)=>{
                featcUserProfile();
                featcSettings();
            });
        } else {
            featcUserProfile();
            featcSettings();
        }
    }, []);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {});
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_3__.connect)(mapStateToProps, mapDispatchToProps)(ContextSet));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9312:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6695);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_saga__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5998);
/* harmony import */ var src_stateManagement_root_RootReducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1288);
/* harmony import */ var src_stateManagement_root_RootSaga__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2630);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([redux_saga__WEBPACK_IMPORTED_MODULE_1__]);
redux_saga__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




// console.log('------------------------REDUX STORE----------------------')
const sagaMiddleware = (0,redux_saga__WEBPACK_IMPORTED_MODULE_1__["default"])();
const store = (0,redux__WEBPACK_IMPORTED_MODULE_0__.createStore)(src_stateManagement_root_RootReducer__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, (0,redux__WEBPACK_IMPORTED_MODULE_0__.applyMiddleware)(sagaMiddleware));
sagaMiddleware.run(src_stateManagement_root_RootSaga__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z).toPromise().catch((e)=>{
    console.log({
        message: e.message,
        source: "sagaError",
        stacktrace: e.sagaStack
    });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (store);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7328:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GI: () => (/* binding */ userOrganizationSetToReducer),
/* harmony export */   c9: () => (/* binding */ setUserProfileToReducer),
/* harmony export */   wb: () => (/* binding */ authLoginApiCall)
/* harmony export */ });
/* unused harmony exports setUserDataToReducer, authInitSignupApiCall, authOtpResendApiCall, authOtpRequireToggle, authPasswordRecoverApiCall, currentBalanceUpdate, winingBalanceUpdate, nameUpdateApiCall, nameUpdateToReducer, passwordUpdateApiCall, passwordUpdateToReducer, logoutApiCall, deleteUserInfo, setDeviceToken, fetchUserProfile */
/* harmony import */ var src_stateManagement_auth_AuthActionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7678);

function authLoginApiCall(payload) {
    return {
        type: src_stateManagement_auth_AuthActionTypes__WEBPACK_IMPORTED_MODULE_0__/* .AUTH_LOGIN_API_CALL */ .N7,
        payload
    };
}
function authInitSignupApiCall(payload, callback) {
    return {
        type: AUTH_SIGNUP_INITIALIZATION,
        payload,
        callback
    };
}
function setUserDataToReducer(payload) {
    return {
        type: AUTH_SIGNUP_DATA_STORE,
        payload
    };
}
function setUserProfileToReducer(payload) {
    console.log(payload);
    return {
        type: src_stateManagement_auth_AuthActionTypes__WEBPACK_IMPORTED_MODULE_0__/* .SET_USER_PROFILE_DATA_TO_STORE */ .ib,
        payload
    };
}
function authOtpResendApiCall(value, callback) {
    return {
        type: AUTH_OTP_RESEND,
        payload: value,
        callback
    };
}
function authOtpRequireToggle(value) {
    return {
        type: AUTH_OTP_REQUIRE,
        payload: value
    };
}
function userOrganizationSetToReducer(payload) {
    console.log("creator", payload);
    return {
        type: src_stateManagement_auth_AuthActionTypes__WEBPACK_IMPORTED_MODULE_0__/* .USER_ORGANIZATION_UPDATE */ .Xy,
        payload: payload
    };
}
function authPasswordRecoverApiCall(payload, callback) {
    return {
        type: AUTH_FORGOT_PASSWORD_API_CALL,
        payload,
        callback
    };
}
function currentBalanceUpdate(payload) {
    //console.log('action creator......', payload);
    return {
        type: CURRENT_BALANCE_UPDATE,
        payload
    };
}
function winingBalanceUpdate(payload) {
    return {
        type: WINING_BALANCE_UPDATE,
        payload
    };
}
function nameUpdateApiCall(payload) {
    return {
        type: NAME_UPDATE_API_CALL,
        payload
    };
}
function nameUpdateToReducer(payload) {
    return {
        type: NAME_UPDATE,
        payload
    };
}
function passwordUpdateApiCall(payload, callback) {
    return {
        type: PASSWORD_UPDATE_API_CALL,
        payload,
        callback
    };
}
function passwordUpdateToReducer(payload) {
    return {
        type: PASSWORD_UPDATE,
        payload
    };
}
function setDeviceToken(payload) {
    return {
        type: DEVICE_TOKEN,
        payload
    };
}
function logoutApiCall() {
    //console.log('logout....actionCreator');
    return {
        type: LOGOUT_API_CALL
    };
}
function deleteUserInfo() {
    return {
        type: DELETE_USER_INFO
    };
}
function fetchUserProfile() {
    return {
        type: USER_PROFILE_FETCH_API_CALL
    };
}



/***/ }),

/***/ 7678:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $U: () => (/* binding */ AUTH_SIGNUP_DATA_STORE),
/* harmony export */   Jk: () => (/* binding */ DEVICE_TOKEN),
/* harmony export */   N7: () => (/* binding */ AUTH_LOGIN_API_CALL),
/* harmony export */   Xy: () => (/* binding */ USER_ORGANIZATION_UPDATE),
/* harmony export */   aA: () => (/* binding */ AUTH_OTP_REQUIRE),
/* harmony export */   eg: () => (/* binding */ DELETE_USER_INFO),
/* harmony export */   ib: () => (/* binding */ SET_USER_PROFILE_DATA_TO_STORE)
/* harmony export */ });
/* unused harmony exports AUTH_SIGNUP_INITIALIZATION, AUTH_OTP_RESEND, AUTH_OTP_VERIFY, AUTH_FORGOT_PASSWORD_API_CALL, CURRENT_BALANCE_UPDATE, WINING_BALANCE_UPDATE, NAME_UPDATE_API_CALL, NAME_UPDATE, PASSWORD_UPDATE_API_CALL, PASSWORD_UPDATE, LOGOUT_API_CALL, USER_PROFILE_FETCH_API_CALL */
const AUTH_LOGIN_API_CALL = "AUTH_LOGIN_API_CALL";
const AUTH_SIGNUP_INITIALIZATION = "AUTH_SIGNUP_INITIALIZATION";
const AUTH_SIGNUP_DATA_STORE = "AUTH_SIGNUP_DATA_STORE";
const AUTH_OTP_RESEND = "AUTH_OTP_RESEND";
const AUTH_OTP_REQUIRE = "AUTH_OTP_REQUIRE";
const AUTH_OTP_VERIFY = "AUTH_OTP_VERIFY";
const AUTH_FORGOT_PASSWORD_API_CALL = "AUTH_FORGOT_PASSWORD_API_CALL";
const SET_USER_PROFILE_DATA_TO_STORE = "SET_USER_PROFILE_DATA_TO_STORE";
const CURRENT_BALANCE_UPDATE = "CURRENT_BALANCE_UPDATE";
const WINING_BALANCE_UPDATE = "WINING_BALANCE_UPDATE";
const NAME_UPDATE_API_CALL = "NAME_UPDATE_API_CALL";
const NAME_UPDATE = "NAME_UPDATE";
const PASSWORD_UPDATE_API_CALL = "PASSWORD_UPDATE_API_CALL";
const PASSWORD_UPDATE = "PASSWORD_UPDATE";
const LOGOUT_API_CALL = "LOGOUT_API_CALL";
const DELETE_USER_INFO = "DELETE_USER_INFO";
const USER_PROFILE_FETCH_API_CALL = "USER_PROFILE_FETCH_API_CALL";
const DEVICE_TOKEN = "DEVICE_TOKEN";
const USER_ORGANIZATION_UPDATE = "USER_ORGANIZATION_UPDATE";



/***/ }),

/***/ 6903:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function getAuthState(state) {
    const { auth } = state;
    return auth;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getAuthState);


/***/ }),

/***/ 4005:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BF: () => (/* binding */ setIsAuthenticated),
/* harmony export */   Jx: () => (/* binding */ commonModalDataSet),
/* harmony export */   v1: () => (/* binding */ setValidityToReducer),
/* harmony export */   xi: () => (/* binding */ testDataUpdate),
/* harmony export */   yU: () => (/* binding */ setGlobalSettingToReducer)
/* harmony export */ });
/* unused harmony exports showLoader, hideLoader, upeateIsAuthenticated */
/* harmony import */ var src_stateManagement_global_GlobalActionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6619);

function testDataUpdate(message) {
    return {
        type: src_stateManagement_global_GlobalActionTypes__WEBPACK_IMPORTED_MODULE_0__/* .TEST_DATA_UPDATE */ .uv,
        payload: {
            message: message
        }
    };
}
function setIsAuthenticated(payload) {
    return {
        type: src_stateManagement_global_GlobalActionTypes__WEBPACK_IMPORTED_MODULE_0__/* .IS_AUTHENTICATED */ .UX,
        payload
    };
}
function commonModalDataSet(payload) {
    return {
        type: src_stateManagement_global_GlobalActionTypes__WEBPACK_IMPORTED_MODULE_0__/* .COMMON_MODAL_DATA_SET */ .dN,
        payload
    };
}
function showLoader() {
    return {
        type: LOADER_SHOW
    };
}
function hideLoader() {
    return {
        type: LOADER_HIDE
    };
}
function upeateIsAuthenticated() {
    return {
        type: UPDATE_IS_AUTHENTICATEED
    };
}
function setGlobalSettingToReducer(payload) {
    return {
        type: src_stateManagement_global_GlobalActionTypes__WEBPACK_IMPORTED_MODULE_0__/* .SET_GLOBAL_SETTINGS */ .vC,
        payload
    };
}
function setValidityToReducer(payload) {
    return {
        type: src_stateManagement_global_GlobalActionTypes__WEBPACK_IMPORTED_MODULE_0__/* .SET_VALIDITY */ .i9,
        payload
    };
}



/***/ }),

/***/ 6619:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UX: () => (/* binding */ IS_AUTHENTICATED),
/* harmony export */   W9: () => (/* binding */ LOADER_HIDE),
/* harmony export */   dN: () => (/* binding */ COMMON_MODAL_DATA_SET),
/* harmony export */   et: () => (/* binding */ LOADER_SHOW),
/* harmony export */   i9: () => (/* binding */ SET_VALIDITY),
/* harmony export */   uv: () => (/* binding */ TEST_DATA_UPDATE),
/* harmony export */   vC: () => (/* binding */ SET_GLOBAL_SETTINGS),
/* harmony export */   vE: () => (/* binding */ UPDATE_IS_AUTHENTICATEED)
/* harmony export */ });
const IS_AUTHENTICATED = "IS_AUTHENTICATED";
const COMMON_MODAL_DATA_SET = "COMMON_MODAL_DATA_SET";
const LOADER_SHOW = "LOADER_SHOW";
const LOADER_HIDE = "LOADER_HIDE";
const UPDATE_IS_AUTHENTICATEED = "UPDATE_IS_AUTHENTICATEED";
const SET_GLOBAL_SETTINGS = "SET_GLOBAL_SETTINGS";
const TEST_DATA_UPDATE = "TEST_DATA_UPDATE";
const SET_VALIDITY = "SET_VALIDITY";



/***/ }),

/***/ 15:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function getGlobalState(state) {
    const { global } = state;
    return global;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getGlobalState);


/***/ }),

/***/ 1288:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ RootReducer)
});

// EXTERNAL MODULE: external "redux"
var external_redux_ = __webpack_require__(6695);
// EXTERNAL MODULE: ./src/stateManagement/global/GlobalActionTypes.js
var GlobalActionTypes = __webpack_require__(6619);
;// CONCATENATED MODULE: ./src/stateManagement/global/GlobalReducer.js

const initialState = {
    isAppOpen: false,
    isAuthenticated: false,
    commonModalOn: false,
    commonModalTitle: "",
    commonModalBody: "",
    commonModalButtonText: "",
    isLoading: false,
    testData: "welcome to saas project",
    currency: "$",
    settings: {},
    organizationSettings: {},
    organization: {},
    validity: 0
};
/* harmony default export */ function GlobalReducer(state = initialState, action) {
    const { type, payload } = action;
    switch(type){
        case GlobalActionTypes/* TEST_DATA_UPDATE */.uv:
            return {
                ...state,
                testData: payload.message
            };
        case GlobalActionTypes/* IS_AUTHENTICATED */.UX:
            return {
                ...state,
                isAuthenticated: payload.status
            };
        case GlobalActionTypes/* COMMON_MODAL_DATA_SET */.dN:
            return {
                ...state,
                commonModalOn: payload.status,
                commonModalTitle: payload.title,
                commonModalBody: payload.body,
                commonModalButtonText: payload.buttonText
            };
        case GlobalActionTypes/* LOADER_SHOW */.et:
            return {
                ...state,
                isLoading: true
            };
        case GlobalActionTypes/* LOADER_HIDE */.W9:
            return {
                ...state,
                isLoading: false
            };
        case GlobalActionTypes/* UPDATE_IS_AUTHENTICATEED */.vE:
            return {
                ...state,
                isAuthenticated: false
            };
        case GlobalActionTypes/* SET_GLOBAL_SETTINGS */.vC:
            return {
                ...state,
                currency: payload?.setting?.currency,
                settings: payload?.setting
            };
        case GlobalActionTypes/* SET_VALIDITY */.i9:
            return {
                ...state,
                validity: payload
            };
        default:
            return state;
    }
}

// EXTERNAL MODULE: ./src/stateManagement/auth/AuthActionTypes.js
var AuthActionTypes = __webpack_require__(7678);
;// CONCATENATED MODULE: ./src/stateManagement/auth/AuthReducer.js

const AuthReducer_initialState = {
    userProfile: {},
    signupData: null,
    isOtpRequired: false,
    deviceToken: "",
    userOrganization: {}
};
/* harmony default export */ function AuthReducer(state = AuthReducer_initialState, action) {
    const { type, payload } = action;
    console.log(action);
    switch(type){
        case AuthActionTypes/* SET_USER_PROFILE_DATA_TO_STORE */.ib:
            return {
                ...state,
                userProfile: payload?.user
            };
        case AuthActionTypes/* AUTH_SIGNUP_DATA_STORE */.$U:
            return {
                ...state,
                signupData: payload
            };
        case AuthActionTypes/* USER_ORGANIZATION_UPDATE */.Xy:
            console.log("reducer", payload);
            return {
                ...state,
                userOrganization: payload.user
            };
        case AuthActionTypes/* DELETE_USER_INFO */.eg:
            return {
                ...state,
                userProfile: {}
            };
        case AuthActionTypes/* AUTH_OTP_REQUIRE */.aA:
            return {
                ...state,
                isOtpRequired: payload
            };
        case AuthActionTypes/* DEVICE_TOKEN */.Jk:
            return {
                ...state,
                deviceToken: payload
            };
        default:
            return state;
    }
}

;// CONCATENATED MODULE: ./src/stateManagement/root/RootReducer.js



;
const combinedReducers = (0,external_redux_.combineReducers)({
    global: GlobalReducer,
    auth: AuthReducer
});
//const rootReducer = reduceReducers(combinedReducers);
/* harmony default export */ const RootReducer = (combinedReducers);


/***/ }),

/***/ 2630:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ RootSaga)
});

// EXTERNAL MODULE: external "redux-saga/effects"
var effects_ = __webpack_require__(6477);
;// CONCATENATED MODULE: ./src/stateManagement/global/GlobalSaga.js
/*
import {all, call, put, select, takeLatest} from 'redux-saga/effects';
import {
  RELOAD_APP,
  START_INIT_APP,
  SUGGESTION_API_CALL,
  IMAGE_UPLOAD,
} from './GlobalActionTypes';
import {
  getUserName,
  getUserPassword,
} from './../../common/storage/storageManager';
import {
  authLoginApiCall,
  fetchUserProfile,
  setUserProfileToReducer,
} from '../auth/AuthActionCreators';
import {
  fetchUserProfileAPIGet,
  gameSuggestionAPIGet,
  imageUpload,
} from '../../common/apiCall/api';
import {
  gameSuggestionApiCall,
  gameSuggestionStore,
  hideLoader,
  reloadAPP,
  showLoader,
} from './GlobalActionCreators';

import fs from 'react-native-fs';

function* appInitWorker({payload}) {
  try {
    const {isAuthenticated} = payload;
    const loginData = {
      cell_phone: yield call(getUserName),
      password: yield call(getUserPassword),
    };
    if (!isAuthenticated && loginData.cell_phone && loginData.password) {
      yield put(
        authLoginApiCall({
          cell_phone: '' + loginData.cell_phone,
          password: '' + loginData.password,
          isSilent: true,
          device_token: '-_-',
        }),
      );
    }
  } catch (e) {
    console.log(e);
  }
}

function* suggestionApiCallWorker() {
  try {
    const suggestions = yield call(gameSuggestionAPIGet);
    //console.log(suggestions);
    yield put(gameSuggestionStore(suggestions.data));
  } catch (e) {
    console.log(e);
  }
}
function* reloadAPPWorker() {
  try {
    yield put(showLoader());
    yield put(fetchUserProfile());
    yield put(onGoingGameApiCall());
    yield put(winHistoryApiCall());
    yield put(gameSuggestionApiCall());
    yield put(hideLoader());
  } catch (e) {
    yield put(hideLoader());

    console.log(e);
  }
}
function* uploadImage({payload}) {
  try {
    yield put(showLoader());

    let fileExtension = payload.uri.split('.').pop();

    //console.log('node.image.uri', payload.uri);
    const file = {
      uri: payload.uri,
      name: Math.random().toString(36).substring(7) + '.' + fileExtension,
      type: payload.type,
    };

    const imagefileData = yield fs.readFile(file.uri, 'base64');

    console.log('file', file);

    const respons = yield call(imageUpload, {
      profile_image: 'data:' + file.type + ';base64,' + imagefileData,
    });

    yield put(setUserProfileToReducer(respons.data));
    yield put(hideLoader());
  } catch (e) {
    yield put(hideLoader());

    console.log(e);
  }
}
*/ function* globalSagaWatcher() {
/*yield takeLatest(START_INIT_APP, appInitWorker);
  yield takeLatest(SUGGESTION_API_CALL, suggestionApiCallWorker);
  yield takeLatest(RELOAD_APP, reloadAPPWorker);
  yield takeLatest(IMAGE_UPLOAD, uploadImage);*/ }
/* harmony default export */ const GlobalSaga = (globalSagaWatcher);

;// CONCATENATED MODULE: ./src/stateManagement/auth/AuthSaga.js




/*

import {
  resendOtpApiCall,
  otpVerificationApiCall,
  signupApiCall,
  loginApiCall,
  fetchUserProfileAPIGet,
  nameUpdateApiCall,
  passwordUpdateApiCall,
  resetPasswordApiCall,
  userLogoutApiCall,
} from '../../common/apiCall/api';
import {setHeaders} from '../../common/apiCall/axiosSetup';
import {networkCallSaga} from '../utilitySaga';

function* getUserProfileApiCallWorker() {
  try {
    const userProfile = yield call(fetchUserProfileAPIGet);
    if (userProfile.data.activation_status === 0) {
      yield put(logoutApiCall());
      yield put(
        commonModalDataSet({
          status: true,
          title: 'User Inactive',
          body: 'You are now Inactive, Please contact to AGENT',
          buttonText: 'OK',
        }),
      );
      return;
    }

    yield put(setUserProfileToReducer(userProfile.data));
  } catch (error) {
    console.log(error);
  }
}

function* authLoginApiCallWorker({payload}) {
  try {
    let isNetwork = yield call(networkCallSaga);
    if (!isNetwork) {
      return;
    }
    if (!payload?.isSilent) {
      yield put(showLoader());
    }

    if (payload.device_token !== '-_-' && payload.device_token !== '') {
      yield call(storeUserDeviceToken, payload.device_token);
    }

    if (payload.device_token === '') {
      const device_token = yield call(getUserDeviceToken);
      if (device_token && getUserDeviceToken !== '') {
        payload.device_token = device_token;
      } else {
        payload.device_token = '-_-';
      }
    }

    const respons = yield call(loginApiCall, payload);

    if (respons.success === false && respons.message == 'OTP is not verified') {
      yield put(hideLoader());
      yield put(authOtpRequireToggle(true));
      return;
    }

    yield call(storeUserAccessToken, respons.access_token);
    yield call(storeUserNamePassword, payload);
    yield call(setHeaders, respons.access_token);
    const userProfile = yield call(fetchUserProfileAPIGet);

    if (!userProfile.data?.cell_phone_verified_at) {
      yield put(hideLoader());
      yield put(authOtpRequireToggle(true));
      return;
    }
    yield put(setUserProfileToReducer(userProfile.data));
    yield put(setIsAuthenticated({status: true}));
    if (!payload?.isSilent) {
      yield put(hideLoader());
    }
  } catch (error) {
    yield put(hideLoader());
    if (!payload?.isSilent) {
      if (error?.errors && error?.errors !== 'Unauthorized') {
        yield put(
          commonModalDataSet({
            status: true,
            title: 'Login Failed',
            body: error?.errors,
            buttonText: 'OK',
          }),
        );
      } else {
        yield put(
          commonModalDataSet({
            status: true,
            title: 'Login Failed',
            body: 'Invalid Phone NO  or Password ',
            buttonText: 'OK',
          }),
        );
      }
    }
  }
}
function* authIintSignUpWorker({payload, callback}) {
  try {
    let isNetwork = yield call(networkCallSaga);
    if (!isNetwork) {
      return;
    }
    yield put(showLoader());
    yield call(signupApiCall, payload);
    yield put(setUserDataToReducer(payload));
    yield put(
      commonModalDataSet({
        status: true,
        title: '',
        body: 'Please check your sms and enter your verification code',
        buttonText: 'OK',
      }),
    );
    yield put(hideLoader());

    callback(payload.cell_phone);
  } catch (error) {
    yield put(hideLoader());
    yield put(
      commonModalDataSet({
        status: true,
        title: 'Signup Failed',
        body: error.errors,
        buttonText: 'OK',
      }),
    );
  }
}
function* authOTPVarifyWorker({payload, callback}) {
  try {
    let isNetwork = yield call(networkCallSaga);
    if (!isNetwork) {
      return;
    }
    yield put(showLoader());

    yield call(otpVerificationApiCall, payload);
    yield put(setUserDataToReducer({}));
    yield put(
      commonModalDataSet({
        status: true,
        title: 'Signup Success',
        body: 'Please login first to Play EasyWin',
        buttonText: 'OK',
      }),
    );
    callback();
    yield put(hideLoader());
  } catch (error) {
    yield put(hideLoader());
    yield put(
      commonModalDataSet({
        status: true,
        title: 'Signup Failed',
        body: 'Please try again.',
        buttonText: 'OK',
      }),
    );
  }
}
function* authOTPResendWorker({payload, callback}) {
  try {
    let isNetwork = yield call(networkCallSaga);
    if (!isNetwork) {
      return;
    }
    yield put(showLoader());
    const response = yield call(resendOtpApiCall, payload);
    callback();
    yield put(hideLoader());
    yield put(
      commonModalDataSet({
        status: true,
        title: '',
        body: 'Please check your sms and enter your verification code',
        buttonText: 'OK',
      }),
    );
  } catch (error) {
    yield put(hideLoader());
    yield put(
      commonModalDataSet({
        status: true,
        title: 'Resend Failed',
        body: 'Please try again.',
        buttonText: 'OK',
      }),
    );
  }
}
function* authForgotPasswordWorker({payload, callback}) {
  try {
    let isNetwork = yield call(networkCallSaga);
    if (!isNetwork) {
      return;
    }
    yield put(showLoader());

    yield call(resetPasswordApiCall, payload);

    yield put(
      commonModalDataSet({
        status: true,
        title: '',
        body:
          'A temporary password has been sent to your registered mobile number',
        buttonText: 'OK',
      }),
    );
    callback();
    yield put(hideLoader());
  } catch (error) {
    yield put(hideLoader());
    yield put(
      commonModalDataSet({
        status: true,
        title: '',
        body: 'Mobile number not found',
        buttonText: 'OK',
      }),
    );
    console.log(error);
  }
}
function* nameUpdateApiCallWorker({payload}) {
  try {
    let isNetwork = yield call(networkCallSaga);
    if (!isNetwork) {
      return;
    }
    yield put(showLoader());

    yield call(nameUpdateApiCall, payload);
    yield put(nameUpdateToReducer(payload));
    yield put(
      commonModalDataSet({
        status: true,
        title: '',
        body: 'your name has been updated',
        buttonText: 'OK',
      }),
    );
    yield put(hideLoader());
  } catch (error) {
    console.log(error);
    yield put(hideLoader());

    yield put(
      commonModalDataSet({
        status: true,
        title: '',
        body: 'your name update has been failed',
        buttonText: 'OK',
      }),
    );
  }
}
function* passwordUpdateApiCallWorker({payload, callback}) {
  try {
    let isNetwork = yield call(networkCallSaga);
    if (!isNetwork) {
      return;
    }
    yield put(showLoader());

    yield call(passwordUpdateApiCall, payload);
    yield put(
      commonModalDataSet({
        status: true,
        title: '',
        body: 'Your Password has been updated',
        buttonText: 'OK',
      }),
    );
    callback();
    yield put(hideLoader());
  } catch (error) {
    console.log(error);
    yield put(hideLoader());

    yield put(
      commonModalDataSet({
        status: true,
        title: 'Password update failed',
        body: error.errors,
        buttonText: 'OK',
      }),
    );
  }
}
function* logoutApiCallWorker({payload}) {
  try {
    yield put(showLoader());
    let isNetwork = yield call(networkCallSaga);
    if (isNetwork) {
      yield call(userLogoutApiCall);
    }

    yield call(storeCleaneLogout);

    yield put(deleteUserInfo());

    yield put(upeateIsAuthenticated());

    yield put(hideLoader());
  } catch (error) {
    console.log(error);
    yield put(hideLoader());

    yield put(
      commonModalDataSet({
        status: true,
        title: '',
        body: 'Logout Request has been failed',
        buttonText: 'OK',
      }),
    );
  }
}
*/ function* AuthSaga_globalSagaWatcher() {
/*yield takeLatest(AUTH_LOGIN_API_CALL, authLoginApiCallWorker);
  yield takeLatest(AUTH_SIGNUP_INITIALIZATION, authIintSignUpWorker);
  yield takeLatest(AUTH_OTP_RESEND, authOTPResendWorker);
  yield takeLatest(AUTH_OTP_VERIFY, authOTPVarifyWorker);
  yield takeLatest(AUTH_FORGOT_PASSWORD_API_CALL, authForgotPasswordWorker);
  yield takeLatest(NAME_UPDATE_API_CALL, nameUpdateApiCallWorker);
  yield takeLatest(PASSWORD_UPDATE_API_CALL, passwordUpdateApiCallWorker);
  yield takeLatest(LOGOUT_API_CALL, logoutApiCallWorker);
  yield takeLatest(USER_PROFILE_FETCH_API_CALL, getUserProfileApiCallWorker);*/ }
/* harmony default export */ const AuthSaga = (AuthSaga_globalSagaWatcher);

;// CONCATENATED MODULE: ./src/stateManagement/root/RootSaga.js



function* RootSaga() {
    yield (0,effects_.all)([
        GlobalSaga(),
        AuthSaga()
    ]);
}


/***/ }),

/***/ 8465:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Kp: () => (/* binding */ warning),
/* harmony export */   QN: () => (/* binding */ indigo),
/* harmony export */   Vp: () => (/* binding */ success),
/* harmony export */   n$: () => (/* binding */ neutral),
/* harmony export */   um: () => (/* binding */ info),
/* harmony export */   vU: () => (/* binding */ error)
/* harmony export */ });
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8442);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mui_material_styles__WEBPACK_IMPORTED_MODULE_0__);

const withAlphas = (color)=>{
    return {
        ...color,
        alpha4: (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_0__.alpha)(color.main, 0.04),
        alpha8: (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_0__.alpha)(color.main, 0.08),
        alpha12: (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_0__.alpha)(color.main, 0.12),
        alpha30: (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_0__.alpha)(color.main, 0.3),
        alpha50: (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_0__.alpha)(color.main, 0.5)
    };
};
const neutral = {
    50: "#F8F9FA",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D2D6DB",
    400: "#9DA4AE",
    500: "#6C737F",
    600: "#4D5761",
    700: "#2F3746",
    800: "#1C2536",
    900: "#111927"
};
const indigo = withAlphas({
    lightest: "#F5F7FF",
    light: "#EBEEFE",
    main: "#6366F1",
    dark: "#4338CA",
    darkest: "#312E81",
    contrastText: "#FFFFFF"
});
const success = withAlphas({
    white: "#FFFFFF",
    black: "#000000",
    lightest: "#F0FDF9",
    light: "#3FC79A",
    main: "#10B981",
    dark: "#0B815A",
    darkest: "#134E48",
    contrastText: "#FFFFFF",
    primary: "#69B128"
});
const info = withAlphas({
    lightest: "#ECFDFF",
    light: "#CFF9FE",
    main: "#06AED4",
    dark: "#0E7090",
    darkest: "#164C63",
    contrastText: "#FFFFFF"
});
const warning = withAlphas({
    lightest: "#FFFAEB",
    light: "#FEF0C7",
    main: "#F79009",
    dark: "#B54708",
    darkest: "#7A2E0E",
    contrastText: "#FFFFFF"
});
const error = withAlphas({
    lightest: "#FEF3F2",
    light: "#FEE4E2",
    main: "#F04438",
    dark: "#B42318",
    darkest: "#7A271A",
    contrastText: "#FFFFFF"
});


/***/ }),

/***/ 6502:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  j: () => (/* binding */ createTheme)
});

// EXTERNAL MODULE: external "@mui/material"
var material_ = __webpack_require__(5692);
// EXTERNAL MODULE: external "@mui/material/colors"
var colors_ = __webpack_require__(5574);
// EXTERNAL MODULE: external "@mui/material/styles"
var styles_ = __webpack_require__(8442);
// EXTERNAL MODULE: ./src/theme/colors.js
var colors = __webpack_require__(8465);
;// CONCATENATED MODULE: ./src/theme/create-palette.js



function createPalette() {
    return {
        action: {
            active: colors/* neutral */.n$[500],
            disabled: (0,styles_.alpha)(colors/* neutral */.n$[900], 0.38),
            disabledBackground: (0,styles_.alpha)(colors/* neutral */.n$[900], 0.12),
            focus: (0,styles_.alpha)(colors/* neutral */.n$[900], 0.16),
            hover: (0,styles_.alpha)(colors/* neutral */.n$[900], 0.04),
            selected: (0,styles_.alpha)(colors/* neutral */.n$[900], 0.12)
        },
        background: {
            default: colors_.common.white,
            paper: colors_.common.white
        },
        divider: "#F2F4F7",
        error: colors/* error */.vU,
        info: colors/* info */.um,
        mode: "light",
        neutral: colors/* neutral */.n$,
        primary: colors/* indigo */.QN,
        success: colors/* success */.Vp,
        text: {
            primary: colors/* neutral */.n$[900],
            secondary: colors/* neutral */.n$[500],
            disabled: (0,styles_.alpha)(colors/* neutral */.n$[900], 0.38)
        },
        warning: colors/* warning */.Kp
    };
}

;// CONCATENATED MODULE: ./src/theme/create-components.js

// Used only to create transitions
const muiTheme = (0,material_.createTheme)();
function createComponents(config) {
    const { palette } = config;
    return {
        MuiAvatar: {
            styleOverrides: {
                root: {
                    fontSize: 14,
                    fontWeight: 600,
                    letterSpacing: 0
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "12px",
                    textTransform: "none"
                },
                sizeSmall: {
                    padding: "6px 16px"
                },
                sizeMedium: {
                    padding: "8px 20px"
                },
                sizeLarge: {
                    padding: "11px 24px"
                },
                textSizeSmall: {
                    padding: "7px 12px"
                },
                textSizeMedium: {
                    padding: "9px 16px"
                },
                textSizeLarge: {
                    padding: "12px 16px"
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                    [`&.${material_.paperClasses.elevation1}`]: {
                        boxShadow: "0px 5px 22px rgba(0, 0, 0, 0.04), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.03)"
                    }
                }
            }
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: "32px 24px",
                    "&:last-child": {
                        paddingBottom: "32px"
                    }
                }
            }
        },
        MuiCardHeader: {
            defaultProps: {
                titleTypographyProps: {
                    variant: "h6"
                },
                subheaderTypographyProps: {
                    variant: "body2"
                }
            },
            styleOverrides: {
                root: {
                    padding: "32px 24px 16px"
                }
            }
        },
        MuiCssBaseline: {
            styleOverrides: {
                "*": {
                    boxSizing: "border-box"
                },
                html: {
                    MozOsxFontSmoothing: "grayscale",
                    WebkitFontSmoothing: "antialiased",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100%",
                    width: "100%"
                },
                body: {
                    display: "flex",
                    flex: "1 1 auto",
                    flexDirection: "column",
                    minHeight: "100%",
                    width: "100%",
                    backgroundColor: "#F6F7F7"
                },
                "#__next": {
                    display: "flex",
                    flex: "1 1 auto",
                    flexDirection: "column",
                    height: "100%",
                    width: "100%"
                },
                "#nprogress": {
                    pointerEvents: "none"
                },
                "#nprogress .bar": {
                    backgroundColor: "#F6F7F7",
                    height: 3,
                    left: 0,
                    position: "fixed",
                    top: 0,
                    width: "100%",
                    zIndex: 2000
                }
            }
        },
        MuiInputBase: {
            styleOverrides: {
                input: {
                    "&::placeholder": {
                        opacity: 1
                    }
                }
            }
        },
        MuiInput: {
            styleOverrides: {
                input: {
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: "24px",
                    "&::placeholder": {
                        color: palette.text.secondary
                    }
                }
            }
        },
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    backgroundColor: "#F6F7F7",
                    borderRadius: 8,
                    borderStyle: "solid",
                    borderWidth: 1,
                    overflow: "hidden",
                    borderColor: palette.neutral[200],
                    transition: muiTheme.transitions.create([
                        "border-color",
                        "box-shadow"
                    ]),
                    "&:hover": {
                        backgroundColor: palette.action.hover
                    },
                    "&:before": {
                        display: "none"
                    },
                    "&:after": {
                        display: "none"
                    },
                    [`&.${material_.filledInputClasses.disabled}`]: {
                        backgroundColor: "#F6F7F7"
                    },
                    [`&.${material_.filledInputClasses.focused}`]: {
                        backgroundColor: "#F6F7F7",
                        borderColor: palette.primary.main,
                        boxShadow: `${palette.primary.main} 0 0 0 2px`
                    },
                    [`&.${material_.filledInputClasses.error}`]: {
                        borderColor: palette.error.main,
                        boxShadow: `${palette.error.main} 0 0 0 2px`
                    }
                },
                input: {
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: "24px"
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    "&:hover": {
                        backgroundColor: palette.action.hover,
                        [`& .${material_.outlinedInputClasses.notchedOutline}`]: {
                            borderColor: palette.neutral[200]
                        }
                    },
                    [`&.${material_.outlinedInputClasses.focused}`]: {
                        backgroundColor: "#F6F7F7",
                        [`& .${material_.outlinedInputClasses.notchedOutline}`]: {
                            borderColor: palette.primary.main,
                            boxShadow: `${palette.primary.main} 0 0 0 2px`
                        }
                    },
                    [`&.${material_.filledInputClasses.error}`]: {
                        [`& .${material_.outlinedInputClasses.notchedOutline}`]: {
                            borderColor: palette.error.main,
                            boxShadow: `${palette.error.main} 0 0 0 2px`
                        }
                    }
                },
                input: {
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: "24px"
                },
                notchedOutline: {
                    borderColor: palette.neutral[200],
                    transition: muiTheme.transitions.create([
                        "border-color",
                        "box-shadow"
                    ])
                }
            }
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    fontSize: 14,
                    fontWeight: 500,
                    [`&.${material_.inputLabelClasses.filled}`]: {
                        transform: "translate(12px, 18px) scale(1)"
                    },
                    [`&.${material_.inputLabelClasses.shrink}`]: {
                        [`&.${material_.inputLabelClasses.standard}`]: {
                            transform: "translate(0, -1.5px) scale(0.85)"
                        },
                        [`&.${material_.inputLabelClasses.filled}`]: {
                            transform: "translate(12px, 6px) scale(0.85)"
                        },
                        [`&.${material_.inputLabelClasses.outlined}`]: {
                            transform: "translate(14px, -9px) scale(0.85)"
                        }
                    }
                }
            }
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: 1.71,
                    minWidth: "auto",
                    paddingLeft: 0,
                    paddingRight: 0,
                    textTransform: "none",
                    "& + &": {
                        marginLeft: 24
                    }
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottomColor: palette.divider,
                    padding: "15px 16px"
                }
            }
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    borderBottom: "none",
                    [`& .${material_.tableCellClasses.root}`]: {
                        borderBottom: "none",
                        backgroundColor: "#F6F7F7",
                        color: palette.neutral[700],
                        fontSize: 12,
                        fontWeight: 600,
                        lineHeight: 1,
                        letterSpacing: 0.5
                    },
                    [`& .${material_.tableCellClasses.paddingCheckbox}`]: {
                        paddingTop: 4,
                        paddingBottom: 4
                    }
                }
            }
        },
        MuiTextField: {
            defaultProps: {
                variant: "filled"
            }
        }
    };
}

;// CONCATENATED MODULE: ./src/theme/create-shadows.js
const createShadows = ()=>{
    return [
        "none",
        "0px 1px 2px rgba(0, 0, 0, 0.08)",
        "0px 1px 5px rgba(0, 0, 0, 0.08)",
        "0px 1px 8px rgba(0, 0, 0, 0.08)",
        "0px 1px 10px rgba(0, 0, 0, 0.08)",
        "0px 1px 14px rgba(0, 0, 0, 0.08)",
        "0px 1px 18px rgba(0, 0, 0, 0.08)",
        "0px 2px 16px rgba(0, 0, 0, 0.08)",
        "0px 3px 14px rgba(0, 0, 0, 0.08)",
        "0px 3px 16px rgba(0, 0, 0, 0.08)",
        "0px 4px 18px rgba(0, 0, 0, 0.08)",
        "0px 4px 20px rgba(0, 0, 0, 0.08)",
        "0px 5px 22px rgba(0, 0, 0, 0.08)",
        "0px 5px 24px rgba(0, 0, 0, 0.08)",
        "0px 5px 26px rgba(0, 0, 0, 0.08)",
        "0px 6px 28px rgba(0, 0, 0, 0.08)",
        "0px 6px 30px rgba(0, 0, 0, 0.08)",
        "0px 6px 32px rgba(0, 0, 0, 0.08)",
        "0px 7px 34px rgba(0, 0, 0, 0.08)",
        "0px 7px 36px rgba(0, 0, 0, 0.08)",
        "0px 8px 38px rgba(0, 0, 0, 0.08)",
        "0px 8px 40px rgba(0, 0, 0, 0.08)",
        "0px 8px 42px rgba(0, 0, 0, 0.08)",
        "0px 9px 44px rgba(0, 0, 0, 0.08)",
        "0px 9px 46px rgba(0, 0, 0, 0.08)"
    ];
};

;// CONCATENATED MODULE: ./src/theme/create-typography.js
const createTypography = ()=>{
    return {
        fontFamily: "system-ui",
        body1: {
            fontSize: "1rem",
            fontWeight: 400,
            lineHeight: 1.5
        },
        body2: {
            fontSize: "0.875rem",
            fontWeight: 400,
            lineHeight: 1.57
        },
        button: {
            fontWeight: 600
        },
        caption: {
            fontSize: "0.75rem",
            fontWeight: 500,
            lineHeight: 1.66
        },
        subtitle1: {
            fontSize: "1rem",
            fontWeight: 500,
            lineHeight: 1.57
        },
        subtitle2: {
            fontSize: "0.875rem",
            fontWeight: 500,
            lineHeight: 1.57
        },
        overline: {
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.5px",
            lineHeight: 2.5
        },
        h1: {
            fontFamily: "system-ui ",
            fontWeight: 700,
            fontSize: "3.5rem",
            lineHeight: 1.2
        },
        h2: {
            fontFamily: "system-ui ",
            fontWeight: 700,
            fontSize: "3rem",
            lineHeight: 1.2
        },
        h3: {
            fontFamily: "system-ui ",
            fontWeight: 700,
            fontSize: "2.25rem",
            lineHeight: 1.2
        },
        h4: {
            fontFamily: "system-ui",
            fontWeight: 700,
            fontSize: "2rem",
            lineHeight: 1.2
        },
        h5: {
            fontFamily: "system-ui ",
            fontWeight: 700,
            fontSize: "1.5rem",
            lineHeight: 1.2
        },
        h6: {
            fontFamily: "system-ui ",
            fontWeight: 700,
            fontSize: "1.125rem",
            lineHeight: 1.2
        },
        label: {
            fontFamily: "system-ui!important",
            fontWeight: 700,
            fontSize: "1.125rem",
            lineHeight: 1.2
        }
    };
};

;// CONCATENATED MODULE: ./src/theme/index.js





function createTheme() {
    const palette = createPalette();
    const components = createComponents({
        palette
    });
    const shadows = createShadows();
    const typography = createTypography();
    return (0,material_.createTheme)({
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 900,
                lg: 1200,
                xl: 1440
            }
        },
        components,
        palette,
        shadows,
        shape: {
            borderRadius: 8
        },
        typography
    });
}


/***/ }),

/***/ 3822:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   S: () => (/* binding */ createEmotionCache)
/* harmony export */ });
/* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1913);
/* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_cache__WEBPACK_IMPORTED_MODULE_0__);

const createEmotionCache = ()=>{
    return _emotion_cache__WEBPACK_IMPORTED_MODULE_0___default()({
        key: "css"
    });
};


/***/ })

};
;