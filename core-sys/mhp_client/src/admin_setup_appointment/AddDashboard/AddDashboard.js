import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./AddDashboard.css";
const AddDashboard = () => {
  const location = useLocation();
  return (
    <div>
      <div className="custom-card mt-2">
        <div className="card-body add-dashboard g-doc-scroll">
          <ul className="setup-list">
            <li className="">
              <Link
                className={`${
                  location.pathname == "/ethnicity" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/ethnicity"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Ethnicity
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname == "/religions" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/religions"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Religions
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname == "/occupation" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/occupation"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Occupations
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname == "/country" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/country"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Country
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname == "/city" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/city"
              >
                <i class="fas menu-icon fa-plus-circle"></i> City
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname == "/birth-sex" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/birth-sex"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Gender
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname == "/status" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/status"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Status
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  location.pathname == "/title" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/title"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Title
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname == "/location" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/location"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Location
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  location.pathname == "/contact-via" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/contact-via"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Contact Via
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname == "/state" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/state"
              >
                <i class="fas menu-icon fa-plus-circle"></i> State
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname == "/usual-provider" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/usual-provider"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Usual Provider
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname == "/usual-account" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/usual-account"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Usual Account
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname == "/timesetup" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/timesetup"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Time Per Patients{" "}
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  location.pathname == "/appointment-length"
                    ? "active-menu"
                    : ""
                } text-decoration-none set-up-btn`}
                to="/appointment-length"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Appointment Length{" "}
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname == "/appointment-type" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/appointment-type"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Appointment Type{" "}
              </Link>
            </li>
            {/* <li>
                            <Link className={`${location.pathname=="/time-slots"?"active-menu":""} text-decoration-none set-up-btn`} to="/time-slots">
                                <i class="fas menu-icon fa-plus-circle"></i> Time Slots </Link>
                        </li> */}
            <li>
              <Link
                className={`${
                  location.pathname == "/time-limits" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/time-limits"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Time Limits{" "}
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname == "/blood-group" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/blood-group"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Blood Group{" "}
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname == "/user-type" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/user-type"
              >
                <i className="fas menu-icon fa-plus-circle"></i> User Type{" "}
              </Link>
            </li>
            {/*<li>*/}
            {/*    <Link className={`${location.pathname=="/doctor-time"?"active-menu":""} text-decoration-none set-up-btn`} to="/doctor-time"><i class="fas menu-icon fa-plus-circle"></i>   Dr. Time Slots</Link>*/}
            {/*</li>*/}

            <li>
              <Link
                className={`${
                  location.pathname == "/vital-unit" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/vital-unit"
              >
                <i className="fas menu-icon fa-plus-circle"></i> Vital sign Unit{" "}
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname == "/media-type" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/media-type"
              >
                <i className="fas menu-icon fa-plus-circle"></i> Media Type{" "}
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname == "/institution" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/institution"
              >
                <i className="fas menu-icon fa-plus-circle"></i> Institute{" "}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddDashboard;
