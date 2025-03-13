import React from "react";
import { FiUserPlus } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import "./dashboard_sidebar.css";
import { RxDashboard } from "react-icons/rx";
import { PiCalendarCheckDuotone, PiUsersThree } from "react-icons/pi";
import { CiSettings } from "react-icons/ci";
import { LiaUserNurseSolid, LiaUsersCogSolid } from "react-icons/lia";
import { PiFlaskLight } from "react-icons/pi";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { FiUser } from "react-icons/fi";
import { MdOutlineInsertChart } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa6";
export default function Left_sidebar(props) {
  const location = useLocation();

  return (
    <nav className="sidebar newSidebar sidebar-offcanvas mt-2" id="sidebar">
      <ul className="nav ps ps--active-scrolling-y">
        <li className={`nav-item`}>
          <Link className="nav-link" to="dashboard">
            <RxDashboard className="menu-icon" size={20} />
            <span className="menu-title">Dashboard</span>
          </Link>
        </li>
        {props?.isSuperAdmin && (
          <li className={`nav-item`}>
            <Link className="nav-link" to="admin-summary">
              <MdOutlineInsertChart className="menu-icon" size={20} />
              <span className="menu-title">Summary</span>
            </Link>
          </li>
        )}
        {(props.isSuperAdmin ||
          (Array.isArray(props.permissionData) &&
            props.permissionData?.some((item) => item.name === "setup"))) && (
          <>
            <li className={`nav-item`}>
              <Link className="nav-link" to="all-setup">
                <CiSettings className="menu-icon" size={20} />
                <span className="menu-title">Admin Setup</span>
              </Link>
            </li>
          </>
        )}
        <li className={`nav-item`}>
          <Link className="nav-link" to="patient-admission-list">
            <FaUserPlus className="menu-icon" size={20} />
            <span className="menu-title">Admission</span>
          </Link>
        </li>
        {(props.isSuperAdmin ||
          (Array.isArray(props.permissionData) &&
            props.permissionData?.some(
              (item) => item.name === "appointment"
            ))) && (
          <li className={`nav-item`}>
            <a
              className="nav-link"
              data-toggle="collapse"
              href="#appointment"
              aria-expanded="false"
              aria-controls="form-elements"
            >
              <PiCalendarCheckDuotone className="menu-icon" size={20} />
              <span className="menu-title">Appointment</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="appointment">
              {((
                Array.isArray(props.permissionData) &&
                props.permissionData?.find(
                  (item) => item.name === "appointment"
                )
              )?.value?.includes("schedule") ||
                props.isSuperAdmin) && (
                <ul className="nav flex-column sub-menu">
                  <li
                    className={`nav-item ${
                      location.pathname === "/appointment" ? "active-nav" : ""
                    }`}
                  >
                    <Link className="nav-link" to="appointment">
                      Appointment Schedule
                    </Link>
                  </li>
                </ul>
              )}
              {((
                Array.isArray(props.permissionData) &&
                props.permissionData?.find(
                  (item) => item.name === "appointment"
                )
              )?.value?.includes("online-appointment") ||
                props.isSuperAdmin) && (
                <ul className="nav flex-column sub-menu">
                  <li
                    className={`nav-item ${
                      location.pathname === "/online-appointment"
                        ? "active-nav"
                        : ""
                    }`}
                  >
                    <Link className="nav-link" to="online-appointment">
                      Online Appointment
                    </Link>
                  </li>
                </ul>
              )}
              {((
                Array.isArray(props.permissionData) &&
                props.permissionData?.find(
                  (item) => item.name === "appointment"
                )
              )?.value?.includes("patient-card") ||
                props.isSuperAdmin) && (
                <ul className="nav flex-column sub-menu">
                  <li
                    className={`nav-item ${
                      location.pathname === "/patient-card" ? "active-nav" : ""
                    }`}
                  >
                    <Link className="nav-link" to="patient-card">
                      Patient Card
                    </Link>
                  </li>
                </ul>
              )}

              {((
                Array.isArray(props.permissionData) &&
                props.permissionData?.find(
                  (item) => item.name === "appointment"
                )
              )?.value?.includes("doctor-list") ||
                props.isSuperAdmin) && (
                <ul className="nav flex-column sub-menu">
                  <li
                    className={`nav-item ${
                      location.pathname === "/doctor-list" ? "active-nav" : ""
                    }`}
                  >
                    <Link className="nav-link" to="doctor-list">
                      Doctor list
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </li>
        )}

        {(props.isSuperAdmin ||
          (Array.isArray(props.permissionData) &&
            props.permissionData?.some(
              (item) => item.name === "digipatients"
            ))) && (
          <li className={`nav-item`}>
            <a
              className="nav-link"
              data-toggle="collapse"
              href="#patients"
              aria-expanded="false"
              aria-controls="tables"
            >
              <LiaUsersCogSolid className="menu-icon" size={20} />
              <span className="menu-title">Digi Patients</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="patients">
              {((
                Array.isArray(props.permissionData) &&
                props.permissionData?.find(
                  (item) => item.name === "digipatients"
                )
              )?.value?.includes("patients") ||
                props.isSuperAdmin) && (
                <ul className="nav flex-column sub-menu">
                  <li
                    className={`nav-item ${
                      location.pathname === "/patients" ? "active-nav" : ""
                    }`}
                  >
                    <Link className="nav-link" to="patients">
                      All Patients
                    </Link>
                  </li>
                </ul>
              )}

              {((
                Array.isArray(props.permissionData) &&
                props.permissionData?.find(
                  (item) => item.name === "digipatients"
                )
              )?.value?.includes("newpatient") ||
                props.isSuperAdmin) && (
                <ul className="nav flex-column sub-menu">
                  <li
                    className={`nav-item ${
                      location.pathname === "/newpatient" ? "active-nav" : ""
                    }`}
                  >
                    <Link className="nav-link" to="newpatient">
                      Add Patients
                    </Link>
                  </li>
                </ul>
              )}
              {((
                Array.isArray(props.permissionData) &&
                props.permissionData?.find(
                  (item) => item.name === "digipatients"
                )
              )?.value?.includes("vital-sign-setup") ||
                props.isSuperAdmin) && (
                <ul className="nav flex-column sub-menu">
                  <li
                    className={`nav-item ${
                      location.pathname === "/vital-sign-setup"
                        ? "active-nav"
                        : ""
                    }`}
                  >
                    <Link className="nav-link" to="vital-sign-setup">
                      Vital Sign Setup
                    </Link>
                  </li>
                </ul>
              )}

              {((
                Array.isArray(props.permissionData) &&
                props.permissionData?.find(
                  (item) => item.name === "digipatients"
                )
              )?.value?.includes("allergy-setup") ||
                props.isSuperAdmin) && (
                <ul className="nav flex-column sub-menu">
                  <li
                    className={`nav-item ${
                      location.pathname === "/allergy-setup" ? "active-nav" : ""
                    }`}
                  >
                    <Link className="nav-link" to="allergy-setup">
                      Allergy Setup
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </li>
        )}

        {(props.isSuperAdmin ||
          (Array.isArray(props.permissionData) &&
            props.permissionData?.some(
              (item) => item.name === "nursestation"
            ))) && (
          <li className={`nav-item`}>
            <a
              className="nav-link"
              data-toggle="collapse"
              href="#nurse"
              aria-expanded="false"
              aria-controls="tables"
            >
              <LiaUserNurseSolid className="menu-icon" size={20} />
              <span className="menu-title">Nurse Station</span>
              <i className="menu-arrow"></i>
            </a>

            <div className="collapse" id="nurse">
              <ul className="nav flex-column sub-menu">
                <li
                  className={`nav-item ${
                    location.pathname === "/patient-vital-reading"
                      ? "active-nav"
                      : ""
                  }`}
                >
                  <Link className="nav-link" to="patient-vital-reading">
                    Vital Reading
                  </Link>
                </li>
              </ul>
            </div>
          </li>
        )}

        {(props.isSuperAdmin ||
          (Array.isArray(props.permissionData) &&
            props.permissionData?.some(
              (item) => item.name === "greatdoc"
            ))) && (
          <li className={`nav-item`}>
            <a
              className="nav-link"
              data-toggle="collapse"
              href="#doctors"
              aria-expanded="false"
              aria-controls="tables"
            >
              <FiUser className="menu-icon" size={20} />
              <span className="menu-title ">Smart Doc</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="doctors">
              {((
                Array.isArray(props.permissionData) &&
                props.permissionData?.find((item) => item.name === "greatdoc")
              )?.value?.includes("doctors") ||
                props.isSuperAdmin) && (
                <ul className="nav flex-column sub-menu">
                  <li
                    className={`nav-item ${
                      location.pathname === "/doctors" ? "active-nav" : ""
                    }`}
                  >
                    <Link className="nav-link" to="doctors">
                      {props.isSuperAdmin ? "All Doctors" : "Doctors"}
                    </Link>
                  </li>
                </ul>
              )}

              {props.isSuperAdmin && (
                <ul className="nav flex-column sub-menu">
                  <li
                    className={`nav-item ${
                      location.pathname === "/new-doctors" ? "active-nav" : ""
                    }`}
                  >
                    <Link className="nav-link" to="new-doctors">
                      Add doctor
                    </Link>
                  </li>
                </ul>
              )}
              {((
                Array.isArray(props.permissionData) &&
                props.permissionData?.find((item) => item.name === "greatdoc")
              )?.value?.includes("doctors-inbox") ||
                props.isSuperAdmin) && (
                <ul className="nav flex-column sub-menu">
                  <li
                    className={`nav-item ${
                      location.pathname === "/doctors-inbox" ? "active-nav" : ""
                    }`}
                  >
                    <Link className="nav-link" to="doctors-inbox">
                      Doctor's Inbox
                    </Link>
                  </li>
                </ul>
              )}
              {((
                Array.isArray(props.permissionData) &&
                props.permissionData?.find((item) => item.name === "greatdoc")
              )?.value?.includes("doctors-chamber") ||
                props.isSuperAdmin) && (
                <ul className="nav flex-column sub-menu">
                  <li
                    className={`nav-item ${
                      location.pathname === "/doctors-chamber"
                        ? "active-nav"
                        : ""
                    }`}
                  >
                    <Link className="nav-link" to="doctors-chamber">
                      Doctor's Chamber
                    </Link>
                  </li>
                </ul>
              )}

              {((
                Array.isArray(props.permissionData) &&
                props.permissionData?.find((item) => item.name === "greatdoc")
              )?.value?.includes("great-doc") ||
                props.isSuperAdmin) && (
                <ul className="nav flex-column sub-menu">
                  <li
                    className={`nav-item ${
                      location.pathname === "/great-doc" ? "active-nav" : ""
                    }`}
                  >
                    <Link className="nav-link" to="great-doc">
                      Prescription
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </li>
        )}

        {(props.isSuperAdmin ||
          (Array.isArray(props.permissionData) &&
            props.permissionData?.some(
              (item) => item.name === "greatlab"
            ))) && (
          <li className={`nav-item`}>
            <a
              className="nav-link"
              data-toggle="collapse"
              href="#lab_panel"
              aria-expanded="false"
              aria-controls="tables"
            >
              <PiFlaskLight className="menu-icon" size={20} />
              <span className="menu-title">Smart Lab</span>
              <i className="menu-arrow"></i>
            </a>

            <div className="collapse" id="lab_panel">
              <ul className="nav flex-column sub-menu">
                {((
                  Array.isArray(props.permissionData) &&
                  props.permissionData?.find((item) => item.name === "greatlab")
                )?.value?.includes("lab-center-details") ||
                  props.isSuperAdmin) && (
                  <>
                    <li
                      className={`nav-item ${
                        location.pathname === "/lab-dashboard"
                          ? "active-nav"
                          : ""
                      }`}
                    >
                      <Link className="nav-link" to="lab-dashboard">
                        Dashboard
                      </Link>
                    </li>
                    <li
                      className={`nav-item ${
                        location.pathname ===
                        "/lab-module-new/lab-center-details"
                          ? "active-nav"
                          : ""
                      }`}
                    >
                      <Link
                        className="nav-link"
                        to="lab-module-new/lab-center-details"
                      >
                        Lab Panel
                      </Link>
                    </li>
                  </>
                )}

                <li
                  className={`nav-item ${
                    location.pathname === "/lab-request-from-app"
                      ? "active-nav"
                      : ""
                  }`}
                >
                  <Link className="nav-link" to="lab-request-from-app">
                    Lab Request
                  </Link>
                </li>

                {((
                  Array.isArray(props.permissionData) &&
                  props.permissionData?.find((item) => item.name === "greatlab")
                )?.value?.includes("great-lab-billing") ||
                  props.isSuperAdmin) && (
                  <li
                    className={`nav-item ${
                      location.pathname === "/great-lab-billing"
                        ? "active-nav"
                        : ""
                    }`}
                  >
                    <Link className="nav-link" to="great-lab-billing">
                      Billing
                    </Link>
                  </li>
                )}
                {((
                  Array.isArray(props.permissionData) &&
                  props.permissionData?.find((item) => item.name === "greatlab")
                )?.value?.includes("great-lab-sample-collection") ||
                  props.isSuperAdmin) && (
                  <li
                    className={`nav-item ${
                      location.pathname === "/great-lab-sample-collection"
                        ? "active-nav"
                        : ""
                    }`}
                  >
                    <Link className="nav-link" to="great-lab-sample-collection">
                      Sample Collection
                    </Link>
                  </li>
                )}

                {((
                  Array.isArray(props.permissionData) &&
                  props.permissionData?.find((item) => item.name === "greatlab")
                )?.value?.includes("great-lab-technician") ||
                  props.isSuperAdmin) && (
                  <li
                    className={`nav-item ${
                      location.pathname === "/great-lab-technician"
                        ? "active-nav"
                        : ""
                    }`}
                  >
                    <Link className="nav-link" to="great-lab-technician">
                      Lab Technologist
                    </Link>
                  </li>
                )}
                {((
                  Array.isArray(props.permissionData) &&
                  props.permissionData?.find((item) => item.name === "greatlab")
                )?.value?.includes("great-lab-report-list") ||
                  props.isSuperAdmin) && (
                  <li
                    className={`nav-item ${
                      location.pathname === "/great-lab-report-list"
                        ? "active-nav"
                        : ""
                    }`}
                  >
                    <Link className="nav-link" to="great-lab-report-list">
                      Report List
                    </Link>
                  </li>
                )}
                {((
                  Array.isArray(props.permissionData) &&
                  props.permissionData?.find((item) => item.name === "greatlab")
                )?.value?.includes("great-lab-report-deivery") ||
                  props.isSuperAdmin) && (
                  <li
                    className={`nav-item ${
                      location.pathname === "/great-lab-report-deivery"
                        ? "active-nav"
                        : ""
                    }`}
                  >
                    <Link className="nav-link" to="great-lab-report-deivery">
                      Report Delivery
                    </Link>
                  </li>
                )}
                {((
                  Array.isArray(props.permissionData) &&
                  props.permissionData?.find((item) => item.name === "greatlab")
                )?.value?.includes("great-lab-report-deivery-list") ||
                  props.isSuperAdmin) && (
                  <li
                    className={`nav-item ${
                      location.pathname === "/great-lab-report-deivery-list"
                        ? "active-nav"
                        : ""
                    }`}
                  >
                    <Link
                      className="nav-link"
                      to="great-lab-report-deivery-list"
                    >
                      Report Delivery List
                    </Link>
                  </li>
                )}
                {((
                  Array.isArray(props.permissionData) &&
                  props.permissionData?.find((item) => item.name === "greatlab")
                )?.value?.includes("great-lab-money-receipt") ||
                  props.isSuperAdmin) && (
                  <>
                    {/* <li
                      className={`nav-item ${
                        location.pathname ===
                        "/great-lab-report-send-to-another"
                          ? "active-nav"
                          : ""
                      }`}
                    >
                      <Link
                        className="nav-link"
                        to="great-lab-report-send-to-another"
                      >
                        Report Send To Another Lab
                      </Link>
                    </li> */}
                    <li
                      className={`nav-item ${
                        location.pathname === "/great-lab-money-receipt"
                          ? "active-nav"
                          : ""
                      }`}
                    >
                      <Link className="nav-link" to="great-lab-money-receipt">
                        Transactions
                      </Link>
                    </li>
                  </>
                )}
                {((
                  Array.isArray(props.permissionData) &&
                  props.permissionData?.find((item) => item.name === "greatlab")
                )?.value?.includes("great-lab-income-summary") ||
                  props.isSuperAdmin) && (
                  <li
                    className={`nav-item ${
                      location.pathname === "/great-lab-income-summary"
                        ? "active-nav"
                        : ""
                    }`}
                  >
                    <Link className="nav-link" to="great-lab-income-summary">
                      Income Summary
                    </Link>
                  </li>
                )}
                {((
                  Array.isArray(props.permissionData) &&
                  props.permissionData?.find((item) => item.name === "greatlab")
                )?.value?.includes("great-lab-expense-summary") ||
                  props.isSuperAdmin) && (
                  <li
                    className={`nav-item ${
                      location.pathname === "/great-lab-expense-summary"
                        ? "active-nav"
                        : ""
                    }`}
                  >
                    <Link className="nav-link" to="great-lab-expense-summary">
                      Expense Summary
                    </Link>
                  </li>
                )}

                {((
                  Array.isArray(props.permissionData) &&
                  props.permissionData?.find((item) => item.name === "greatlab")
                )?.value?.includes("great-lab-income-expense-report") ||
                  props.isSuperAdmin) && (
                  <li
                    className={`nav-item ${
                      location.pathname === "/great-lab-income-expense-report"
                        ? "active-nav"
                        : ""
                    }`}
                  >
                    <Link
                      className="nav-link"
                      to="great-lab-income-expense-report"
                    >
                      Income & Expense Report
                    </Link>
                  </li>
                )}
                {((
                  Array.isArray(props.permissionData) &&
                  props.permissionData?.find((item) => item.name === "greatlab")
                )?.value?.includes("great-lab-income-expense-report") ||
                  props.isSuperAdmin) && (
                  <li
                    className={`nav-item ${
                      location.pathname === "/great-lab-inventory"
                        ? "active-nav"
                        : ""
                    }`}
                  >
                    <Link className="nav-link" to="great-lab-inventory">
                      Inventory
                    </Link>
                  </li>
                )}
                {((
                  Array.isArray(props.permissionData) &&
                  props.permissionData?.find((item) => item.name === "greatlab")
                )?.value?.includes("great-lab-income-expense-report") ||
                  props.isSuperAdmin) && (
                  <li
                    className={`nav-item ${
                      location.pathname === "/great-lab-reports"
                        ? "active-nav"
                        : ""
                    }`}
                  >
                    <Link className="nav-link" to="great-lab-reports">
                      Lab Reports
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </li>
        )}

        {(props.isSuperAdmin ||
          (Array.isArray(props.permissionData) &&
            props.permissionData?.some(
              (item) => item.name === "labagent"
            ))) && (
          <li className={`nav-item`}>
            <a
              className="nav-link"
              data-toggle="collapse"
              href="#lab_agent"
              aria-expanded="false"
              aria-controls="tables"
            >
              <FiUserPlus className="menu-icon" size={20} />
              <span className="menu-title">Lab Agent</span>

              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="lab_agent">
              <ul className="nav flex-column sub-menu">
                {((
                  Array.isArray(props.permissionData) &&
                  props.permissionData?.find((item) => item.name === "labagent")
                )?.value?.includes("lab-agent-list") ||
                  props.isSuperAdmin) && (
                  <li
                    className={`nav-item ${
                      location.pathname === "/lab-agent-list"
                        ? "active-nav"
                        : ""
                    }`}
                  >
                    <Link className="nav-link" to="lab-agent-list">
                      Lab Agents
                    </Link>
                  </li>
                )}

                {((
                  Array.isArray(props.permissionData) &&
                  props.permissionData?.find((item) => item.name === "labagent")
                )?.value?.includes("application") ||
                  props.isSuperAdmin) && (
                  <li
                    className={`nav-item ${
                      location.pathname === "/application" ? "active-nav" : ""
                    }`}
                  >
                    <Link className="nav-link" to="application">
                      Add Lab Agent
                    </Link>
                  </li>
                )}

                {((
                  Array.isArray(props.permissionData) &&
                  props.permissionData?.find((item) => item.name === "labagent")
                )?.value?.includes("lab-agent") ||
                  props.isSuperAdmin) && (
                  <li
                    className={`nav-item ${
                      location.pathname === "/lab-agent" ? "active-nav" : ""
                    }`}
                  >
                    <Link className="nav-link" to="lab-agent">
                      Billing
                    </Link>
                  </li>
                )}

                {((
                  Array.isArray(props.permissionData) &&
                  props.permissionData?.find((item) => item.name === "labagent")
                )?.value?.includes("lab-agent-sample-collection") ||
                  props.isSuperAdmin) && (
                  <li
                    className={`nav-item ${
                      location.pathname === "/lab-agent-sample-collection"
                        ? "active-nav"
                        : ""
                    }`}
                  >
                    <Link className="nav-link" to="lab-agent-sample-collection">
                      Sample Collection
                    </Link>
                  </li>
                )}

                {((
                  Array.isArray(props.permissionData) &&
                  props.permissionData?.find((item) => item.name === "labagent")
                )?.value?.includes("lab-agent-sample-send") ||
                  props.isSuperAdmin) && (
                  <li
                    className={`nav-item ${
                      location.pathname === "/lab-agent-sample-send"
                        ? "active-nav"
                        : ""
                    }`}
                  >
                    <Link className="nav-link" to="lab-agent-sample-send">
                      Sample Send To Lab
                    </Link>
                  </li>
                )}

                {((
                  Array.isArray(props.permissionData) &&
                  props.permissionData?.find((item) => item.name === "labagent")
                )?.value?.includes("lab-agent-report-collection") ||
                  props.isSuperAdmin) && (
                  <li
                    className={`nav-item ${
                      location.pathname === "/lab-agent-report-collection"
                        ? "active-nav"
                        : ""
                    }`}
                  >
                    <Link className="nav-link" to="lab-agent-report-collection">
                      Report Collection
                    </Link>
                  </li>
                )}

                {((
                  Array.isArray(props.permissionData) &&
                  props.permissionData?.find((item) => item.name === "labagent")
                )?.value?.includes("lab-agent-report-delivery") ||
                  props.isSuperAdmin) && (
                  <li
                    className={`nav-item ${
                      location.pathname === "/lab-agent-report-delivery"
                        ? "active-nav"
                        : ""
                    }`}
                  >
                    <Link className="nav-link" to="lab-agent-report-delivery">
                      Report List
                    </Link>
                  </li>
                )}

                {((
                  Array.isArray(props.permissionData) &&
                  props.permissionData?.find((item) => item.name === "labagent")
                )?.value?.includes("rate-list") ||
                  props.isSuperAdmin) && (
                  <li
                    className={`nav-item ${
                      location.pathname === "/rate-list" ? "active-nav" : ""
                    }`}
                  >
                    <Link className="nav-link" to="rate-list">
                      Rate List
                    </Link>
                  </li>
                )}

                {((
                  Array.isArray(props.permissionData) &&
                  props.permissionData?.find((item) => item.name === "labagent")
                )?.value?.includes("report-delivery") ||
                  props.isSuperAdmin) && (
                  <li
                    className={`nav-item ${
                      location.pathname === "/report-delivery"
                        ? "active-nav"
                        : ""
                    }`}
                  >
                    <Link className="nav-link" to="report-delivery">
                      Report Delivery
                    </Link>
                  </li>
                )}

                {((
                  Array.isArray(props.permissionData) &&
                  props.permissionData?.find((item) => item.name === "labagent")
                )?.value?.includes("report-delivery-list") ||
                  props.isSuperAdmin) && (
                  <li
                    className={`nav-item ${
                      location.pathname === "/report-delivery-list"
                        ? "active-nav"
                        : ""
                    }`}
                  >
                    <Link className="nav-link" to="report-delivery-list">
                      Report Delivery List
                    </Link>
                  </li>
                )}

                {((
                  Array.isArray(props.permissionData) &&
                  props.permissionData?.find((item) => item.name === "labagent")
                )?.value?.includes("money-receipt-list") ||
                  props.isSuperAdmin) && (
                  <li
                    className={`nav-item ${
                      location.pathname === "/money-receipt-list"
                        ? "active-nav"
                        : ""
                    }`}
                  >
                    <Link className="nav-link" to="money-receipt-list">
                      Transactions
                    </Link>
                  </li>
                )}

                {((
                  Array.isArray(props.permissionData) &&
                  props.permissionData?.find((item) => item.name === "labagent")
                )?.value?.includes("lab-agent-income-summary") ||
                  props.isSuperAdmin) && (
                  <li
                    className={`nav-item ${
                      location.pathname === "/lab-agent-income-summary"
                        ? "active-nav"
                        : ""
                    }`}
                  >
                    <Link className="nav-link" to="lab-agent-income-summary">
                      Income Summary
                    </Link>
                  </li>
                )}

                {((
                  Array.isArray(props.permissionData) &&
                  props.permissionData?.find((item) => item.name === "labagent")
                )?.value?.includes("lab-agent-expense-summary") ||
                  props.isSuperAdmin) && (
                  <li
                    className={`nav-item ${
                      location.pathname === "/lab-agent-expense-summary"
                        ? "active-nav"
                        : ""
                    }`}
                  >
                    <Link className="nav-link" to="lab-agent-expense-summary">
                      Expense Summary
                    </Link>
                  </li>
                )}

                {((
                  Array.isArray(props.permissionData) &&
                  props.permissionData?.find((item) => item.name === "labagent")
                )?.value?.includes("lab-agent-income-expense-report") ||
                  props.isSuperAdmin) && (
                  <li
                    className={`nav-item ${
                      location.pathname === "/lab-agent-income-expense-report"
                        ? "active-nav"
                        : ""
                    }`}
                  >
                    <Link
                      className="nav-link"
                      to="lab-agent-income-expense-report"
                    >
                      Income & Expense Report
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </li>
        )}
        {(props.isSuperAdmin ||
          (Array.isArray(props.permissionData) &&
            props.permissionData?.some((item) => item.name === "hr"))) && (
          <li className={`nav-item`}>
            <a
              className="nav-link"
              data-toggle="collapse"
              href="#employee"
              aria-expanded="false"
              aria-controls="tables"
            >
              <PiUsersThree className="menu-icon" size={20} />

              <span className="menu-title">HR</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="employee">
              {((
                Array.isArray(props.permissionData) &&
                props.permissionData?.find((item) => item.name === "hr")
              )?.value?.includes("employee") ||
                props.isSuperAdmin) && (
                <ul className="nav flex-column sub-menu">
                  <li
                    className={`nav-item ${
                      location.pathname === "/employee" ? "active-nav" : ""
                    }`}
                  >
                    <Link className="nav-link" to="employee">
                      All Employee
                    </Link>
                  </li>
                </ul>
              )}

              {
                <ul className="nav flex-column sub-menu">
                  <li
                    className={`nav-item ${
                      location.pathname === "/holiday" ? "active-nav" : ""
                    }`}
                  >
                    <Link className="nav-link" to="holiday">
                      Holiday
                    </Link>
                  </li>
                </ul>
              }

              {((
                Array.isArray(props.permissionData) &&
                props.permissionData?.find((item) => item.name === "hr")
              )?.value?.includes("add-employee") ||
                props.isSuperAdmin) && (
                <ul className="nav flex-column sub-menu">
                  <li
                    className={`nav-item ${
                      location.pathname === "/add-employee" ? "active-nav" : ""
                    }`}
                  >
                    <Link className="nav-link" to="add-employee">
                      Add employee
                    </Link>
                  </li>
                </ul>
              )}

              {((
                Array.isArray(props.permissionData) &&
                props.permissionData?.find((item) => item.name === "hr")
              )?.value?.includes("users") ||
                props.isSuperAdmin) && (
                <ul className="nav flex-column sub-menu">
                  <li
                    className={`nav-item ${
                      location.pathname === "/users" ? "active-nav" : ""
                    }`}
                  >
                    <Link className="nav-link" to="users">
                      User List & Assign
                    </Link>
                  </li>
                </ul>
              )}

              {((
                Array.isArray(props.permissionData) &&
                props.permissionData?.find((item) => item.name === "hr")
              )?.value?.includes("role-setup") ||
                props.isSuperAdmin) && (
                <ul className="nav flex-column sub-menu">
                  <li
                    className={`nav-item ${
                      location.pathname === "/user-role" ? "active-nav" : ""
                    }`}
                  >
                    <Link className="nav-link" to="user-role">
                      Role
                    </Link>
                  </li>
                </ul>
              )}

              {((
                Array.isArray(props.permissionData) &&
                props.permissionData?.find((item) => item.name === "hr")
              )?.value?.includes("user-role-system") ||
                props.isSuperAdmin) && (
                <ul className="nav flex-column sub-menu">
                  <li
                    className={`nav-item ${
                      location.pathname === "/user-role-system"
                        ? "active-nav"
                        : ""
                    }`}
                  >
                    <Link className="nav-link" to="user-role-system">
                      User Role Managment
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </li>
        )}
        {(props.isSuperAdmin ||
          (Array.isArray(props.permissionData) &&
            props.permissionData?.some(
              (item) => item.name === "accounts"
            ))) && (
          <li className={`nav-item`}>
            <a
              className="nav-link"
              data-toggle="collapse"
              href="#billing"
              aria-expanded="false"
              aria-controls="tables"
            >
              <LiaFileInvoiceDollarSolid className="menu-icon" size={20} />
              <span className="menu-title">Accounts</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="billing">
              <ul className="nav flex-column sub-menu">
                {((
                  Array.isArray(props.permissionData) &&
                  props.permissionData?.find((item) => item.name === "accounts")
                )?.value?.includes("billingPatient") ||
                  props.isSuperAdmin) && (
                  <li
                    className={`nav-item ${
                      location.pathname === "/billingPatient "
                        ? "active-nav"
                        : ""
                    }`}
                  >
                    <Link className="nav-link" to="/billingPatient">
                      Billing & Invoice
                    </Link>
                  </li>
                )}

                {((
                  Array.isArray(props.permissionData) &&
                  props.permissionData?.find((item) => item.name === "accounts")
                )?.value?.includes("income-summary") ||
                  props.isSuperAdmin) && (
                  <li
                    className={`nav-item ${
                      location.pathname === "/income-summary "
                        ? "active-nav"
                        : ""
                    }`}
                  >
                    <Link className="nav-link" to="/income-summary">
                      Income Summary
                    </Link>
                  </li>
                )}

                {((
                  Array.isArray(props.permissionData) &&
                  props.permissionData?.find((item) => item.name === "accounts")
                )?.value?.includes("expense-summary") ||
                  props.isSuperAdmin) && (
                  <li
                    className={`nav-item ${
                      location.pathname === "/expense-summary "
                        ? "active-nav"
                        : ""
                    }`}
                  >
                    <Link className="nav-link" to="/expense-summary">
                      Expense Summary
                    </Link>
                  </li>
                )}

                {((
                  Array.isArray(props.permissionData) &&
                  props.permissionData?.find((item) => item.name === "accounts")
                )?.value?.includes("income-expense-report") ||
                  props.isSuperAdmin) && (
                  <li
                    className={`nav-item ${
                      location.pathname === "/income-expense-report "
                        ? "active-nav"
                        : ""
                    }`}
                  >
                    <Link className="nav-link" to="/income-expense-report">
                      Income & Expense Report
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </li>
        )}
      </ul>
    </nav>
  );
}
