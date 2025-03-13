import React, { lazy, Suspense, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import UserSignUp from "./Component/LoginForm/UserSignUp";
import NoMatch from "./Component/NoMatch/NoMatch";
import LoginForm from "./Component/LoginForm/LoginForm";
// import Dashboard_content from "./Component/Dashboard/Dashboard_content";
import "react-datepicker/dist/react-datepicker.css";
import { QueryProvider } from "./context/Query-conext";
import Loader from "./Loader";
const Dashboard_content = lazy(() =>
  import("./Component/Dashboard/Dashboard_content")
);
function App() {
  const [storageData, setstorageData] = useState(false);
  useEffect(() => {
    const value = JSON.parse(localStorage.getItem("userData"));
    if (value) {
      setstorageData(value);
    }
  }, []);

  if (!storageData) {
    return (
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<LoginForm></LoginForm>}></Route>
          <Route path="*" element={<NoMatch />} />
          <Route
            path="/user-signup"
            element={<UserSignUp></UserSignUp>}
          ></Route>
          {/* <Route path="/dash" element={<Dashboard_content></Dashboard_content>}></Route> */}
        </Routes>
      </Suspense>
    );
  } else {
    return (
      <Suspense fallback={<Loader />}>
        <QueryProvider>
          <Dashboard_content perStorageData={storageData}></Dashboard_content>
        </QueryProvider>
      </Suspense>
    );
  }
}
export default App;
