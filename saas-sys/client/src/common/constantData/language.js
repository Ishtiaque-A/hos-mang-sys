import * as Yup from "yup";

export const ADD_SUBSCRIPTION = "Add Subscription";
export const LOGIN_UPPER = "LOG IN";
export const LOGIN_LOWER = "Log In";
export const EMAIL = "Email";
export const INVALID_EMAIL = "Invalid email address";
export const SIGNUP_UPPER = "SIGN UP";
export const SIGNUP_LOWER = "Sign Up";
export const ID = "ID";
export const USER_ID = "User Id";
export const PASSWORD = "Password";
export const FORGOT_PASSWORD = "Forgot Password";
export const DO_NOT_HAVE_ACCOUNT = "Don't have an account?";
export const HAVE_AN_ACCOUNT_ACCOUNT = "I Already Have an account!";
export const RESET = "RESET";
export const NAME = "Name";
export const PHONE_NO = "Phone No";
export const REFERENCE_ID = "Reference Id";
export const EDIT_PROFILE = "EDIT PROFILE";
export const CHANGE_PASSWORD = "Change Password";
export const CURRENT_PASSWORD = "Current Password";
export const NEW_PASSWORD = "New Password";
export const CONFIRM_PASSWORD = "Confirm Password";
export const SAVE = "Save";
export const DONE = "DONE";
export const AMOUNT = "Amount";
export const TO = "To";
export const OK = "OK";
export const ANOTHER = "Another";
export const CURRENT = "Current";
export const BALANCE = "Balance";
export const CURRENCY_SIGN = "$";
export const BIDDING_FAILED = "Bidding Failed";
export const NOT_SUFFICIENT_MONEY = "You do not have sufficient money";
export const HELP_US = "HELP US";
export const TUTORIAL = "Tutorial";
export const WATCH_AND_LEARN = "watch and learn";
export const FEEDBACK = "Feedback";
export const HELP_US_IMPROVE = "Help us to improve";
export const RATE_US = "Rate Us";
export const HELP_US_GROW = "Help us to grow";
export const OUR_OTHERS_APPS = "Our Other APPS";
export const YOU_MAY_LIKE_ALSO = "You may like also";
export const SHARE = "Share";
export const ABOUT_APP = " ABOUT APP";
export const INVITE_YOUR_FRIENDS = "Invite your friends";
export const DISCLAIMER = "Disclaimer";
export const SUBJECT_TO_CHANGE = "Subject to change";
export const PRIVACY_POLICY = "Privacy Policy";
export const SUBMIT = "Submit";
export const BACK = "Back";
export const UPDATE = "Update";
export const EDIT = "Edit";
export const MAME = "Name";

export const LOGIN = {
  TITLE: "Log in to Saas",
  LOGIN: "Log in",
  SEND: "Send",
  EMAIL: "Email address",
  OTP: "Otp",
  RESAND: "Resand Otp",
  SUBMIT: "Submit",
  PASSWORD: "Password",
  FORGET: "Forgot Password",
  GoBACK: "Go back to login",
  ADD_SUCCESS_MESSAGE: "User login successfully",
  ADD_ERROR_MESSAGE: "Something is wrong",
  REQUIRED: {
    EMAIL: "Email is required",
    PASSWORD: "Password is required",
    OTP: "Otp is required",
  },
};
export const USER = {
  USER_TITLE: "User List",
  ADD_USER_TITLE: "Add New User",
  UPDATE_USER_TITLE: "Update User",
  EDIT_USER_TITLE: "User Details",
  USER_BRANCH: "Branch",
  NAME: "Name ",
  EMAIL: "Email",
  CODE: "Organization Code",
  PHONE: "Mobile",
  STATUS: "Status",
  USER_TYPE: "User Type",
  ORGANIZATION: "Organization",
  PASSWORD: "Password",
  CURRENT_PASSWORD: "Current Password",
  NEW_PASSWORD: "New password",
  CONFIRM_NEW_PASSWORD: "Confirm new password",
  STORAGELIMIT: "Storage",
  ACTION: "Action",
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  User_Add_Button: "Add User",
  DETAILS: "Details",
  DELETE: "Delete",
  EDIT: "Edit",
  PHOTO: "Photo",
  ADD_SUCCESS_MESSAGE: "New User Created",
  ADD_DELETE_MESSAGE: " successfully",
  ADD_ERROR_MESSAGE: "Something is wrong",
  UPDATE_SUCCESS_MESSAGE: "Update successfully",

  REQUIRED: {
    NAME: "Name is required",
    EMAIL: "Email  is required",
    PHONE: "Mobile number is required",
    USERTYPE: "User type is required",
    PASSWORD: "Password is required",
    NEW_PASSWORD: "New password is required",
    CONFIRM_PASSWORD: "Confirm password is required",
    CONFIRM_PASSWORD2: "Confirm password not match",
    STORAGELIMIT: "Storage limit is required",
    STATUS: "Status is required",
  },
};

export const STORAGE = {
  TITLE: "Storage List",
  ADD_TITLE: "Add Storage",
  UPDATE_TITLE: "Update Storage",
  EDIT_USER_TITLE: "User Details",
  NAME: "Name ",
  SIZE: "Size",
  ACTION: "Action",
  Add_Button: "Add Storage",
  DELETE: "Delete",
  EDIT: "Edit",
  ADD_SUCCESS_MESSAGE: "Storage add successfully",
  ADD_DELETE_MESSAGE: "User delete successfully",
  ADD_ERROR_MESSAGE: "Something is wrong",
  UPDATE_SUCCESS_MESSAGE: "Update successfully",

  REQUIRED: {
    NAME: "Name is required",
    SIZE: "Storage size is required",
  },
};

export const VALIDITY = {
  TITLE: "Validity List",
  ADD_TITLE: "Add Validity",
  UPDATE_TITLE: "Update Validity",
  EDIT_USER_TITLE: "User Details",
  NAME: "Name ",
  DAYS: "Days",
  Add_Button: "Add Storage",
  DELETE: "Delete",
  EDIT: "Edit",
  ACTION: "Action",
  ADD_SUCCESS_MESSAGE: "Validity add successfully",
  ADD_DELETE_MESSAGE: "User delete successfully",
  ADD_ERROR_MESSAGE: "Something is wrong",
  UPDATE_SUCCESS_MESSAGE: "Update successfully",

  REQUIRED: {
    NAME: "Name is required",
    DAYS: "Days is required",
  },
};

export const ORGANIZATION = {
  TITLE: "Organization List",
  ADD_TITLE: "Add New Organization",
  CODE: "Organization Code",
  UPDATE_TITLE: "Update Organization",
  ORGANIZATION_Add_BUTTON: "Organization User",
  EDIT_USER_TITLE: "Organization Details",
  NAME: "Organization Name ",
  EMAIL: "Organization Email",
  PHONE: "Contact Number",
  ADDRESS: "Contract Address",
  ACTION: "Action",
  CONTACT_PERSON_NAME: "Contact Person Name",
  CONTACT_PERSON_PHONE: "Contact Person Mobile number",
  CONTACT_PERSON_EMAIL: "Contact Person Email",
  CONTACT_PERSON_DESINGNATION: "Contact Person Designation",
  DB_NAME: "Database Name",
  STATUS: "Status",
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  DETAILS: "Details",
  ADD_DELETE_MESSAGE: "Organization delete successfully",
  ADD_SUCCESS_MESSAGE: "Organization add successfully",
  UPDATE_SUCCESS_MESSAGE: "Update successfully",
  REQUIRED: {
    NAME: "Name is required",
    EMAIL: "Email limit is required",
    PHONE: "Mobile number is required",
    CONTACT_PERSON_NAME: "Contact Person Name is required",
    CONTACT_PERSON_PHONE: "Contact Person Mobile number is required",
    CONTACT_PERSON_EMAIL: "Contact Person Email is required",
    CONTACT_PERSON_DESINGNATION: "Contact Person Designation is required",
  },
};

export const OWNORGANIZATION = {
  TITLE: "Organization Information",
  ADD_TITLE: "Add New Organization",
  UPDATE_TITLE: "Update Organization",
  CODE: "Organization Code",
  ORGANIZATION_Add_BUTTON: "Organization User",
  EDIT_USER_TITLE: "Organization Details",
  NAME: "Name ",
  EMAIL: "Email",
  ONAME: "Organization Name ",
  OEMAIL: "Organization Email",
  PHONE: "Mobile number",
  ADDRESS: "Address",
  LOGO: "Logo",
  CONTACT_PERSON_NAME: "Contact Person Name",
  CONTACT_PERSON_PHONE: "Contact Person Mobile number",
  CONTACT_PERSON_EMAIL: "Contact Person Email",
  CONTACT_PERSON_DESINGNATION: "Contact Person Designation",
  DB_NAME: "Database Name",
  STATUS: "Status",
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  DETAILS: "Details",
  ADD_ERROR_MESSAGE: "Something is wrong",
  ADD_DELETE_MESSAGE: "Organization delete successfully",
  ADD_SUCCESS_MESSAGE: "Organization add successfully",
  UPDATE_SUCCESS_MESSAGE: "Update successfully",
  REQUIRED: {
    ONAME: "Organization name is required",
    OEMAIL: "Organization email limit is required",
    PHONE: "Mobile number is required",
    ADDRESS: "Address number is required",
  },
};

export const SETTING = {
  TITLE: "Settings",
  CURRENCY: "Currency",
  EMAIL: "Email",
  PHONE: "Mobile number",
  ADD_ERROR_MESSAGE: "Something is wrong",
  ADD_DELETE_MESSAGE: "Organization delete successfully",
  ADD_SUCCESS_MESSAGE: "Organization add successfully",
  UPDATE_SUCCESS_MESSAGE: "Update successfully",
  REQUIRED: {
    CURRENCY: "Currency name is required",
    EMAIL: "Email limit is required",
    PHONE: "Mobile number is required",
  },
};
export const FEATURE = {
  TITLE: "Features",
  Subscription: "Subscription",
  USER_LIMIT: "User limit",
  Feature_Add_Button: "Add Feature",
  ADD_DELETE_MESSAGE: "User delete successfully",
  ADD_ERROR_MESSAGE: "Something is wrong",
};
export const FEATURE_TABLE = {
  TITLE: "Details",
  MAME: "Name",
  DETAILS: "Details",
  ACTION: "Action",
  DELETE: "InActive",
  PARENT: "Parent",
  STATUS: "Status",
  ACTIVE: "Active",
  INACTIVE: "Inactive",
};
export const SUBSCRIPTION_PLAN = {
  TITLE: "Subscription plan",
  MAME: "Name",
  DURATION: "Durations",
  USER: "Number of Users",
  PRICE: "Price",
  STORAGE: "Storage",
  USER_LIMIT: "User Limit",
  DETAILS: "Details",
  TYPE: "Type",
  STATUS: "Status",
  ACTION: "Action",
  ADD_BUTTON: "Create Subscription",
  REGULAR: "Regular",
  SPECIAL: "Special",
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  ADD_DELETE_MESSAGE: "Subscription plan inactive successfully",
  ADD_ERROR_MESSAGE: "Something is wrong",
};

export const SUBSCRIPTION_DETAILS = {
  TITLE: "Subscription Details",
  MAME: "Name",
  DURATION: "Durations",
  USER: "Number of Users",
  PRICE: "Price",
  STORAGE: "Storage",
  USER_LIMIT: "User Limit",
  DETAILS: "Details",
  STATUS: "Status",
  ACTION: "Action",
  FEATURES: "Features",
  ADD_BUTTON: "Create Subscription",
  ACTIVE: "Active",
  INACTIVE: "Inactive",
};

export const FEATURE_DETAILS = {
  TITLE: "Feature Details",
  MAME: "Name",
  DETAILS: "Details",
  PARENT: "Parent",
  STATUS: "Status",
  EDIT: "Edit",
};

export const ADD_FEATURE = {
  ERROR_NAME: "Feature is required!",
  ERROR_STATUS: "Status is required!",
  ERROR_DETAILS: "Details is required!",
  TITLE2: "Edit Feature",
  TITLE: "Add New Feature",
  MAME: "Name ",
  PARENT: "Parent",
  STATUS: "Status ",
  DETAILS: "Details ",
  EDIT: "Edit",
  ADD_SUCCESS_MESSAGE: "Feature add successfully",
  ADD_ERROR_MESSAGE: "Something is wrong",
  ADD_SUCCESS_MESSAGE2: "Feature Update successfully",
};
export const COUPON = {
  TITLE: "Coupon",
  Subscription: "Subscription",
  USER_LIMIT: "User limit",
  COUPON_Add_Button: "Add Coupon",
  ADD_DELETE_MESSAGE: "Coupon delete successfully",
  ADD_ERROR_MESSAGE: "Something is wrong",
};
export const HISTORY = {
  TITLE: "History",
  Subscription: "Subscription Plan",
  PRICE: "Price",
  AMOUNT: "Payment amount",
  STATUS: "Status",
  DATE: "Date",
  ACTION: "Action",
  USER_LIMIT: "User limit",
  ACTUAL_PRICE: "Actual Price",
  SELL_PRICE: "Sell Price",
  COMMENT: "Comment",
  COUPON_Add_Button: "Add Coupon",
  ADD_DELETE_MESSAGE: "Coupon delete successfully",
  ADD_ERROR_MESSAGE: "Something is wrong",
  DETAILS: "Details",
};
export const BILLING = {
  TITLE: "Billing & Subscriptions",
  Subscription: "Subscription",
  USER_LIMIT: "User limit",
  BILLING_Button: "Purchase Plan",
  CANCEL: "Cancel",
  BILLING_Button2: "Update Add-On",
  SEE_MORE_Button: "See more",
  LESS_Button: "Less",
  BILLING_Button3: "Edit",
  ADD_DELETE_MESSAGE: "Coupon delete successfully",
  ADD_ERROR_MESSAGE: "Something is wrong",
};
export const COUPON_TABLE = {
  TITLE: "Details",
  CUDE: "CODE",
  AMOUNT: "AMOUNT",
  AMOUNT_TYPE: "DISCOUNT TYPE",
  START_DATE: "START DATE",
  EXPIRE_DATE: "EXPIRE DATE",
  USER_TYPE: "USER TYPE",
  SUBSCRIPTION_PLAN_TYPE: "SUBSCRIPTION PLAN TYPE",
  DETAILS: "Details",
  ACTION: "Action",
  DELETE: "InActive",
  PARENT: "Parent",
  STATUS: "Status",
};
export const COUPON_DETAILS = {
  TITLE: "Coupon",
  DETAILS: "Coupon Details",
  CODE: "Code",
  AMOUNT: "Amount",
  DISCOUNT_TYPE: "Discount Type",
  START_DATE: "Start Date",
  EXPIRE_DATE: "Expire Date",
  USER_TYPE: "Users",
  SUBSCRIPTION_PLAN_TYPE: "Subscription Plans",
  EDIT: "Edit",
};
export const ADD_COUPON = {
  TITLE: "Add New Coupon",
  TITLE2: "Edit Coupon",
  CODE: "Code ",
  AMOUNT: "Amount ",
  DISCOUNT_TYPE: "Discount Type ",
  START_DATE: "Start Date ",
  EXPIRE_DATE: "Expire Date ",
  USER_TYPE: "User Type ",
  USERS: "Select multiple users",
  SUBSCRIPTION_PLAN_TYPE: "Subscription Plan Type ",
  SUBSCRIPTIONS: "Select multiple subscription plan",
  EDIT: "Edit",
  ADD_SUCCESS_MESSAGE: "Coupon add successfully",
  ADD_ERROR_MESSAGE: "Something is wrong",
};
export const SUBSCRIPTION_PLAN_REQUEST = {
  TITLE: "Subscription Request",
  MAME: "Name",
  EMAIL: "Email",
  PHONE: "Mobile number",
  COUNTRY: "Country",
  MESSAGE: "Message",
  SUBSCRIPTION_PLAN_TYPE: "Subscription Plan ",
  USER_LIMIT: "User Limit",
  DETAILS: "Details",
  STATUS: "Status",
  ACTION: "Action",
  ADD_BUTTON: "Create Subscription",
  AGREE: "Agree",
  PENDING: "Not Seen",
  REVIEWING: "Seen",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  ADD_DELETE_MESSAGE: "Status updated",
  ADD_ERROR_MESSAGE: "Something is wrong",
};
export const SUBSCRIBE = {
  COMPANY_NAME: "Smart Health",
  TITLE: "Subscribe Now",
  MAME: "Name",
  EMAIL: "Email",
  SUBSCRIPTION_PLAN: "Subscription Plan",
  PHONE: "Mobile number",
  COUNTRY: "Country",
  MESSAGE: "Message",
  USER_LIMIT: "User Limit",
  DETAILS: "Details",
  SUBSCRIBE_DETAILS: "Request Information",
  STATUS: "Status",
  ACTION: "Action",
  ADD_BUTTON: "Create Subscription",
  AGREE: "Agree",
  ACCEPT: "Accept",
  CUSTOMAIZ_PLAN: "customaiz Plan",
  CANCEL: "Cancel",
  SHOW_MORE: "Show More",
  ERROR_NAME: "Name is required ",
  ERROR_EMAIL: "Email is required",
  ERROR_PHONE: "Mobile number is required",
  ERROR_COUNTRY: "Country name is required",
  ERROR_MESSSAGE: "Write a short message for us",
  ERROR_SUBSCRIPTION_PLAN: "Select a suitable subscription for your business",
  ADD_SUCCESS_MESSAGE: "Subscribe successfully",
  GENERIC_SUCCESS_MESSAGE: "Success",
  ADD_SUCCESS_MESSAGE2: "The request rejected successfully",
  ADD_ERROR_MESSAGE: "Something is wrong",
};
export const SUBSCRIPTION = {
  TITLE: "Plan Title",
  USER_LIMIT: "User Limit",
  PRICE: "Price ",
  TYPE: "Type",
  VALIDITY_IN_DAYS: "Duration Of Validity",
  STORAGE_LIMIT: "Storage limit ",
  DETAILS: "Details ",
  ADD_NEW_SUBSCRIPTION_PLAN: "New Subscription Plan",
  EDIT_NEW_SUBSCRIPTION_PLAN: "Edit Subscription Plan",
  ADD_SUBSCRIPTION: "Add Subscription",
  ADD_SUCCESS_MESSAGE: "Subscription plan add successfully",
  UPDATE_SUCCESS_MESSAGE: "Subscription plan update successfully",
  SELECT_MULTIPLE_FEATURE: "Select Multiple Feature",
  ADD_ERROR_MESSAGE: "Something is wrong",
  ADD_ERROR_MESSAGE2: "Invalid amount",
  REQUIRED: {
    TITLE: "Title is required",
    USER_LIMIT: "User limit is required",
    PRICE: "Price is required",
    DURATION: "Duration is required",
    STORAGE: "Storage limit is required",
    DETAILS: "Details is required",
    FEATURES: "Features is required",
    TYPE: "Type is required",
  },
};

export const AUDIT = {
  TITLE: "Audit log",
  DETAILS_TITLE: "Report Details ",
  DOWNLOAD_BUTTON: "Download sheet",
  START_DATE: "Start date",
  END_DATE: "End date",
  //ADMIN:"Admin",
  ADMIN: "User type",
  //ORGANIZATION:"Organization",
  SCOPE: "Scope",
  TYPE: "Operation type",
  USER: "User",
  USER_NAME: "User name",
  ACTION: "Action",
  ATTRIBUTES: "attributes",
  OLD: "Old",
  USER_MOBILE: "User mobile",
  ORGANIZATION: "organization",
  MODEL: "model",
  CREATED_AT: "Created date",
  KEY: "Key",
  NEW_VALUE: "New value",
  Old_VALUE: "Old value",

  REQUIRED: {
    TITLE: "Title is required",
  },
};

export const SUBSCRIPTIONS = {
  REQUIRED: {
    COUPON: "coupon name is required",
    LAST_NAME: "Last name is required",
    CCV: "Ccv is required",
    NUMBER: "Number is required",
    EXPIRE_MONTH: "Expire month is required",
    EXPIRE_YEAR: "Expire year is required",
    REASON: "Reason year is required",
  },
};

export const SUBSCRIPTIONPLAN = {
  TITLE: "Subscription plan report",
  DETAILS_TITLE: "Report Details ",
  DOWNLOAD_BUTTON: "Download sheet",
  NAME: "Name",
  PURCHASES: "Minimum purchases count",
  ACCEPT: "Minimum accept count",
  REJECT: "Minimum reject count",
  MIN_PRICE: "Minimum price",
  PRICE: "Price",
  RIQUEST_COUNT: "Request count",
  ACCEPT_COUNT: "Accept count",
  REJECT_COUNT: "Reject count",
  PURCHASES_COUNT: "Purchases Count",
  USER: "User",
  START_DATE: "Start date",
  END_DATE: "End date",
  USER_NAME: "User name",
  ACTION: "Action",
  ATTRIBUTES: "attributes",
  OLD: "Old",
  USER_MOBILE: "User mobile",
  TYPE: "Type",
  ORGANIZATION: "organization",
  MODEL: "model",
  CREATED_AT: "Created date",
  KEY: "Key",
  NEW_VALUE: "New value",
  Old_VALUE: "Old value",

  REQUIRED: {
    TITLE: "Title is required",
  },
};

export const ORGANIZATION_PLAN = {
  TITLE: "Organization plan report",
  DETAILS_TITLE: "Report Details ",
  DOWNLOAD_BUTTON: "Download sheet",
  NAME: "Name",
  MIN_SUBSCRIPTIONS: "Minimum subscription count",
  MIN_USER: "Minimum users count",
  MIN_PRICE: "Minimum price",
  RIQUEST_COUNT: "Request count",
  ACCEPT_COUNT: "Accept count",
  REJECT_COUNT: "Reject count",
  PURCHASES_COUNT: "Purchases Count",
  DETAILS: "Details",
  START_DATE: "Start date",
  END_DATE: "End date",
  PRICE: "Price",
  USER_LIMIT: "User limit",
  USER: "User",
  USER_NAME: "User name",
  EMAIL: "Email",
  STATUS: "Status",
  USERS_COUNT: "Users count",
  SUBSCRIPTION_COUNTS: "Subscription counts",
  PURCHASES_AMOUNT: "Purchases amount",
  ACTION: "Action",
  ATTRIBUTES: "attributes",
  OLD: "Old",
  USER_MOBILE: "User mobile",
  TYPE: "Type",
  ORGANIZATION: "organization",
  MODEL: "model",
  CREATED_AT: "Created date",
  KEY: "Key",
  NEW_VALUE: "New value",
  Old_VALUE: "Old value",

  REQUIRED: {
    TITLE: "Title is required",
  },
};

export const USERS_PLAN = {
  TITLE: "User plan report",
  DETAILS_TITLE: "Report Details ",
  DOWNLOAD_BUTTON: "Download sheet",
  NAME: "Name",
  UPDATE_OPERATION: "Update operation",
  CREATE_OPERATION: "Create operation",
  MIN_CREATED: "Minimum created count",
  MIN_UPDATED: "Minimum updated count",
  RIQUEST_COUNT: "Request count",
  ACCEPT_COUNT: "Accept count",
  REJECT_COUNT: "Reject count",
  PURCHASES_COUNT: "Purchases Count",
  DETAILS: "Details",
  START_DATE: "Start date",
  END_DATE: "End date",
  PRICE: "Price",
  USER_LIMIT: "User limit",
  USER: "User",
  USER_NAME: "User name",
  EMAIL: "Email",
  STATUS: "Status",
  USERS_COUNT: "Users count",
  SUBSCRIPTION_COUNTS: "Subscription counts",
  PURCHASES_AMOUNT: "Purchases amount",
  ACTION: "Action",
  ATTRIBUTES: "attributes",
  OLD: "Old",
  USER_MOBILE: "User mobile",
  TYPE: "Type",
  ORGANIZATION: "organization",
  MODEL: "model",
  CREATED_AT: "Created date",
  KEY: "Key",
  NEW_VALUE: "New value",
  Old_VALUE: "Old value",

  REQUIRED: {
    TITLE: "Title is required",
  },
};

export const CANCEL_REQUEST = {
  TITLE: "Subscription cancel request",
  DETAILS_TITLE: "Report Details ",
  DOWNLOAD_BUTTON: "Download sheet",
  NAME: "Organization name",
  SUBSCRIPTION_PLAN: "Subscription plan",
  START_DATE: "Start date",
  END_DATE: "End date",
  PRICE: "Price",
  STATUS: "Status",
  ACTION: "Action",
  ADDRESS: "Address",
  CONTUCT_P_NAME: "Contract person name",
  CONTUCT_P_MOBAILE: "Contract person mobile",
  CONTUCT_P_EMAIL: "Contract person email",
  PAID_AMOUNT: "Sell amount",
  ACCEPT: "Accept",
  ACCEPT_Request: "Accept Request",
  REJECT_Request: "Reject Request",
  REJECT: "Reject",
  NOTE: "Note",
  AMOUNT: "Amount",

  REQUIRED: {
    TITLE: "Title is required",
    NOTE: "Note is required",
    AMOUNT: "Amount is required",
  },
};

export const REFOUND = {
  TITLE: "Refund List",
  DETAILS_TITLE: "Refund Details ",
  DOWNLOAD_BUTTON: "Download sheet",
  NAME: "Organization name",
  SUBSCRIPTION_PLAN: "Subscription plan",
  START_DATE: "Start date",
  END_DATE: "End date",
  PRICE: "Price",
  STATUS: "Status",
  ACTION: "Action",
  ADDRESS: "Address",
  CONTUCT_P_NAME: "Pontract person name",
  CONTUCT_P_MOBAILE: "Contract person mobile",
  CONTUCT_P_EMAIL: "Contract person email",
  PAID_AMOUNT: "Paid amount",
  ACCEPT: "Status Update",
  ACCEPT_Request: "Accept Request",
  REJECT: "Reject",
  NOTE: "Note",
  AMOUNT: "Amount",
  ACCOUNT_DETAILS: "Account details",
  REFOUND_REFERENCE: "Refund reference",
  REFOUND_NOTE: "Refund note",
  STATUS_UPDATE: "Status Update",

  REQUIRED: {
    TITLE: "Title is required",
    NOTE: "Note is required",
    AMOUNT: "Amount is required",
  },
};