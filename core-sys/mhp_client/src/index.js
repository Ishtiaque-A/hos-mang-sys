import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "./imageUrl";
import axios from "axios";

process.env.NODE_ENV === "development"
  ? (axios.defaults.baseURL = process.env.REACT_APP_DEV_MODE_URL)
  : (axios.defaults.baseURL = process.env.REACT_APP_PRO_MODE_URL);

if (localStorage.getItem("ZGDIO4sPbQEa") !== null) {
  const userData = JSON.parse(localStorage.getItem("userData"));
  axios.defaults.headers.common["branch-name"] = userData.branch_name;
  axios.defaults.headers.common["branch-id"] = userData.branch_id;
  axios.defaults.headers.common["user-id"] = userData.user_id;
  axios.defaults.headers.common["bs-type"] = userData.bs_type;
  axios.defaults.headers.common["is-super-admin"] =
    userData.user_type === "Super_Admin" || userData.user_type === "3"
      ? true
      : false;
  axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
    localStorage.getItem("ZGDIO4sPbQEa")
  )}`;
}

// axios.defaults.baseURL = 'http://localhost:8000/api';
// axios.defaults.baseURL = 'http://dashboard.greatdoc.org/server/public/api';

// dev live
// axios.defaults.baseURL = "https://dev.macrohealthplus.org/mhp_server/public/api";

// greatdoc live
// axios.defaults.baseURL = "http://greatdoc.org/mhp_server/public/api";

// greatdoc live
// axios.defaults.baseURL = "http://doctor.greatdoc.org/mhp_server/public/api";

// live
// axios.defaults.baseURL = "https://macrohealthplus.org/mhp_server/public/api";
// axios.defaults.baseURL = "https://dev.macrohealthplus.org/test/public/api"
//

const cloudUrl = axios.create({
  // baseURL: "http://34.87.117.104:5000/",
  baseURL: "https://mims.macrohealthplus.org/",
});

// const cloudUrl = axios.create({
// baseURL: "http://34.87.117.104:5000/",
//});

export { cloudUrl };

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
