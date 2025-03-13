import React from "react";
import { Link, useLocation } from "react-router-dom";

const ProcedureReportSetupSidebar = () => {
  const location = useLocation();

  return (
    <div>
      <div className="custom-card mt-2">
        <div className="card-body">
          <ul className="setup-list">
            <li>
              <Link
                className={`${
                  location.pathname === "/item-numbers" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/item-numbers"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Item Numbers{" "}
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/indication" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/indication"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Indication{" "}
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/procedure-report-name"
                    ? "active-menu"
                    : ""
                } text-decoration-none set-up-btn`}
                to="/procedure-report-name"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Procedure
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/findings" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/findings"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Findings
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/incision" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/incision"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Incision
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/pathology" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/pathology"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Pathology
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/drain" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/drain"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Drain
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/antibiotics" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/antibiotics"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Antibiotics
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/blood-loss" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/blood-loss"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Blood Loss
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/procedure-details"
                    ? "active-menu"
                    : ""
                } text-decoration-none set-up-btn`}
                to="/procedure-details"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Procedure Details
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/observation" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/observation"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Observation
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/diet" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/diet"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Diet
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/analgesia" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/analgesia"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Analgesia
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/dvt-prop" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/dvt-prop"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Dvt Prop
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/antibiotics-two" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/antibiotics-two"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Antibiotics Two
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/discharge" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/discharge"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Discharge
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "followup" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/followup"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Follow Up
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "post-operative" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/post-operative"
              >
                <i class="fas menu-icon fa-plus-circle"></i> Post Operative
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProcedureReportSetupSidebar;
