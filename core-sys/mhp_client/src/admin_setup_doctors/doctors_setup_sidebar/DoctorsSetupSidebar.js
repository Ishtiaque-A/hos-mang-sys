import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./AddDashboard.css";
const DoctorsSetupSidebar = () => {
  const location = useLocation();

  return (
    <div>
      <div className="custom-card mt-2">
        <div className="card-body">
          <ul className="setup-list">
            <li>
              <Link
                className={`${
                  location.pathname === "/all-test" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/all-test"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Test{" "}
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/all-visit" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/all-visit"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Visit Type{" "}
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/reaction" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/reaction"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Reaction{" "}
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/diagnosis" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/diagnosis"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Diagnosis{" "}
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/palcconsumption" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/palcconsumption"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Past Alcohol
                Consumption{" "}
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/occupational-hazards"
                    ? "active-menu"
                    : ""
                } text-decoration-none set-up-btn`}
                to="/occupational-hazards"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Ocupational Hazards{" "}
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/current-smoking-history"
                    ? "active-menu"
                    : ""
                } text-decoration-none set-up-btn`}
                to="/current-smoking-history"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Current Smoking
                History{" "}
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/tobacco-type" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/tobacco-type"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Tobacco Type{" "}
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/tobacco-cost" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/tobacco-cost"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Tobacco cost (per
                day){" "}
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/advice-suggestion"
                    ? "active-menu"
                    : ""
                } text-decoration-none set-up-btn`}
                to="/advice-suggestion"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Advice & Suggestion{" "}
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/diagnosis-action" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/diagnosis-action"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Diagnosis Action{" "}
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/generic-name" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/generic-name"
              >
                <i class="fas menu-icon fa-plus-circle"></i>Drugs Generic Name
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/drug-name" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/drug-name"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Drug Name{" "}
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/drug-unit" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/drug-unit"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Drug Unit{" "}
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/route-name" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/route-name"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Route Name{" "}
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/dose-name" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/dose-name"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Dose Name{" "}
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/frequency-name" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/frequency-name"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Frequency Name{" "}
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/food-name" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/food-name"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Food Name{" "}
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/others-name" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/others-name"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Others Name{" "}
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/department" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/department"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Departments{" "}
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/specialist" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/specialist"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Specialist{" "}
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/general-note-setup"
                    ? "active-menu"
                    : ""
                } text-decoration-none set-up-btn`}
                to="/general-note-setup"
              >
                <i class="fas menu-icon fa-plus-circle"></i> General Note{" "}
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/doctor-advice" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/doctor-advice"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Doctor Advice
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DoctorsSetupSidebar;
