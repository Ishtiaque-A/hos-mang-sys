// export const BASE_URL = "https://sinewycare.com/";
export const BASE_URL = "http://35.240.213.16:8004/";
// export const BASE_URL = "https://sandbox.saas-back.macrohealthplus.org/";
export const API_BASE_URL = BASE_URL + "api/";
// export const IMAGE_BASE_URL = "https://sandbox.saas.macrohealthplus.org/images/users/";
export const IMAGE_BASE_URL = "http://35.240.213.16:8003/images/users/";
// export const APP_URL = "http://34.126.183.51:3000/";
export const APP_URL = "http://35.240.213.16:8003/";
export const LINKED_APP_URL = APP_URL + "/register";

export const WEB_SOCKET_BASE_URL = "";

export const AWS_ACCESS_KEY_ID = "";
export const AWS_SECRET_ACCESS_KEY = "";

let newTime = parseInt(new Date().toString().split(" GMT")[1].split(" ")[0]);
let timeZone = newTime / 100 + (newTime % 100 ? 0.5 : 0);
export const TEMTIME = -timeZone * 60 + 180;
/*
export const TIME_SOUDI =
  (-parseInt(new Date().getTimezoneOffset()) + 180) * 60 * 1000;*/

export const TIME_SOUDI = -180 * 60 * 1000;
export const RESULT_SHOEING_DURATION = Math.ceil(
  (Math.abs(parseInt(new Date().getTimezoneOffset()) + 180) + 120) / 60
);
export const PLAN_DURATION = [
  {
    day: 7,
    name: "One Week",
  },
  {
    day: 15,
    name: "15 Days",
  },
  {
    day: 30,
    name: "One Month",
  },
  {
    day: 60,
    name: "Two Months",
  },
  {
    day: 90,
    name: "Three Months",
  },
  {
    day: 180,
    name: "Half Year",
  },
  {
    day: 7,
    365: "One Year",
  },
];
export const PLAN_STORAGE = [
  {
    limit: 500,
    name: "500 MB",
  },
  {
    limit: 1028,
    name: "1 GB",
  },
  {
    limit: 2056,
    name: "2 GB",
  },
  {
    limit: 3084,
    name: "3 GB",
  },
  {
    limit: 5140,
    name: "5 GB",
  },
  {
    limit: 10280,
    name: "10 GB",
  },
  {
    limit: 20560,
    name: "20 GB",
  },
];

export const USER_TYPES = [
  {
    key: 0,
    name: "Super Admin",
  },
  {
    key: 1,
    name: "Super Admin",
  },
  {
    key: 2,
    name: "Super User",
  },
  {
    key: 3,
    name: "Organization Admin",
  },
  {
    key: 4,
    name: "Organization User",
  },
  {
    limit: 5,
    name: "User",
  },
];
export const ACCESS = {
  SUPER_ADMIN: 0,
  SUPER_USER: 2,
  LOCAL_ADMIN: 3,
  LOCAL_USER: 4,
  OTHER: 5,
};
//const now = moment(new Date(Date.now() - timeDiffSaudi * 60 * 1000));